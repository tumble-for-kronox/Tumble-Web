class Endpoints {
    static baseUrl = "tumble.hkr.se";
    static debugBaseUrl = "localhost:7036";

    /* ---------------------- Schedule endpoints ---------------------- */

    /**[GET]
     * Requires scheduleId path parameter.
     * Requires schoolId query field. Optional sessionToken & startDate
     * */
    static getSchedule = "/schedules/";


    /* ----------------------- Search endpoints ----------------------- */

    /**[GET]
     * Requires schoolId and search query fields. Optional sessionToken
     * */
    static search = "/schedules/search"


    /* ------------------------ User endpoints ----------------------- */

    /**[GET]
     * Requires schoolId query field.
     * Requires username & password body fields.
     */
    static login = "/users/login";


    /* --------------------- User Event endpoints --------------------- */

    /**[GET]
     * Requires schoolId & sessionToken query fields.
     * */
    static getUserEvents = "/users/events";

    /**[PUT]
     * Requires eventId path parameter.
     * Requires schoolId & sessionToken query fields.
     * */
    static registerForUserEvent = "/users/events/register/";

    /**[PUT]
     * Requires eventId path parameter.
     * Requires schoolId & sessionToken query fields.
     */
    static unregisterFromUserEvent = "/users/events/unregister/";

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
    static getResourceData = "/resources/";

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