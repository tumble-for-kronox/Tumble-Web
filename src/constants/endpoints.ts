export default class Endpoints {
    static baseUrl = "https://tumble.hkr.se";
    static debugBaseUrl = "https://localhost:7036";

    /* ---------------------- Schedule endpoints ---------------------- */

    /**[GET]
     * Requires scheduleId path parameter.
     * Requires schoolId query field. Optional sessionToken & startDate
     * */
    static getSchedule = (scheduleId: string) => `/schedules/${scheduleId}`;


    /* ----------------------- Search endpoints ----------------------- */

    /**[GET]
     * Requires schoolId and search query fields. Optional sessionToken
     * */
    static search = "/schedules/search"


    /* ------------------------ User endpoints ----------------------- */

    /**[POST]
     * Requires schoolId query field.
     * Requires username & password body fields.
     */
    static login = "/users/login";

    /**[GET]
     * Requires authorization header.
     * Requires schoolId query field.
     */
    static refresh = "/users/refresh"


    /* --------------------- User Event endpoints --------------------- */

    /**[GET]
     * Requires schoolId & sessionToken query fields.
     * */
    static getUserEvents = "/users/events";

    /**[PUT]
     * Requires eventId path parameter.
     * Requires schoolId & sessionToken query fields.
     * */
    static registerForUserEvent = (eventId: string) => `/users/events/register/${eventId}`;

    /**[PUT]
     * Requires eventId path parameter.
     * Requires schoolId & sessionToken query fields.
     */
    static unregisterFromUserEvent = (eventId: string) => `/users/events/unregister/${eventId}`;

    /**[PUT]
     * Requires schoolId & sessionToken query fields.
     */
    static registerAllAvailableUserEvents = "/users/events/register/all";


    /* ---------------------- Resource Endpoints ---------------------- */

    /**[GET]
     * Requires schoolId & sessionToken query fields.
     */
    static getAllSchoolResources = "/resources";

    /**[GET]
     * Requires schoolId & sessionToken query fields.
     */
    static getAllUserBookings = "/resources/userbookings";

    /**[GET]
     * Requires resourceId path parameter.
     * Requires schoolId & sessionToken query fields. Optional date
     */
    static getResourceData = (resourceId: string) => `/resources/${resourceId}`;

    /**[PUT]
     * Requires schoolId & sessionToken query fields.
     * Requires resourceId, date, and availabilitySlot body fields.
     */
    static bookResource = "/resources/book";

    /**[PUT]
     * Requires bookingId, schoolId, and sessionToken query fields.
     */
    static unbookResource = "/resources/unbook";


    /* --------------------- Submit Issue Endpoint -------------------- */

    /**[POST]
     * Requires title & description body fields.
     */
    static submitIssue = "/misc/submitIssue";
}