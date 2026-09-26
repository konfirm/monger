import type { Position } from "@konfirm/geojson";
import { isObject, type } from "../../../BSON";

const RAD = Math.PI / 180;

/**
 * Shortest signed angular difference b - a, normalized into (-180, 180]
 * degrees, so edges crossing the antimeridian still contribute their true
 * (short) span rather than the raw numeric one.
 *
 * @param {number} a
 * @param {number} b
 * @return {*}  {number}
 */
function shortestDelta(a: number, b: number): number {
    const delta = (b - a) % 360;

    if (delta > 180) return delta - 360;
    if (delta <= -180) return delta + 360;

    return delta;
}

/**
 * Area enclosed by a ring on a unit sphere, in steradians (0 to 4*PI),
 * using the standard vertex-triple spherical excess formula. Always
 * returns the area of whichever side the ring's literal winding encloses,
 * as a positive number — it does not itself decide which side is
 * "inside".
 *
 * @param {Array<Position>} ring
 * @return {*}  {number}
 */
export function ringArea(ring: Array<Position>): number {
    const n = ring.length;
    let sum = 0;

    for (let i = 0; i < n; i++) {
        const [prevLon] = ring[(i - 1 + n) % n];
        const [, lat] = ring[i];
        const [nextLon] = ring[(i + 1) % n];

        sum += shortestDelta(prevLon, nextLon) * RAD * Math.sin(lat * RAD);
    }

    return Math.abs(sum) / 2;
}

/**
 * Does the ring's literal (as-wound) interior cover more than half the
 * sphere? MongoDB's default $geoWithin behaviour inverts to the smaller
 * complement whenever this is true, unless the geometry explicitly
 * requests strict winding — see hasStrictWindingCRS.
 *
 * @param {Array<Position>} ring
 * @return {*}  {boolean}
 */
export function exceedsHemisphere(ring: Array<Position>): boolean {
    return ringArea(ring) > Math.PI * 2;
}

/**
 * Does the geometry carry MongoDB's strict-winding CRS annotation? When
 * present, $geoWithin trusts the ring's literal winding instead of
 * inverting large rings to their smaller complement.
 *
 * @param {*} geometry
 * @return {*}  {boolean}
 */
export function hasStrictWindingCRS(geometry: any): boolean {
    const { crs } = geometry;

    return !!crs
        && typeof crs === 'object'
        && (crs as any).type === 'name'
        && (crs as any).properties?.name === 'urn:x-mongodb:crs:strictwinding:EPSG:4326';
}

/**
 * Validates a geometry's `crs` member, matching real MongoDB's own
 * rejection of an unrecognized one — confirmed via mongo-catalog ground
 * truth (geoWithinIntersectsMatrix, 2026-09-23): a non-object `crs` and a
 * well-formed-but-unrecognized CRS name both throw, distinctly. Currently
 * "recognized" only ever means the one strict-winding CRS this project has
 * needed so far — anything shaped like a `{type:'name', properties:{name}}`
 * reference but not that exact name is rejected the same way MongoDB does;
 * any other, untested shape (missing `properties.name`, `type: 'link'`,
 * etc.) is deliberately left unvalidated rather than guessed at.
 *
 * @param {*} geometry
 * @return {*}  {void}
 */
export function validateCRS(geometry: any): void {
    const { crs } = geometry;

    if (crs === undefined) {
        return;
    }
    if (!isObject(crs)) {
        throw new Error(`GeoJSON CRS must be an object, instead got type ${type(crs)}`);
    }

    const name = (crs as any).properties?.name;

    if ((crs as any).type === 'name' && typeof name === 'string' && name !== 'urn:x-mongodb:crs:strictwinding:EPSG:4326') {
        throw new Error(`Unknown CRS name: ${name}`);
    }
}
