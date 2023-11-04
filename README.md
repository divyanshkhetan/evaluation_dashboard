[https://jade-rooster-robe.cyclic.app/](https://jade-rooster-robe.cyclic.app/)

### Features:
- Mail sent on locking the profile
- Marksheet available to download after locking the profile
- Mentor can have minimum 3 and maximum 4 students at any point of time
- Changes made to marksheet are synced on cloud
- Marks of students can be locked
- Filters to see all students, assigned students and unassigned students to a mentor
- Checks to see that all the students have been assigned marks before locking
- Once locked, the marks cannot be editted any further
- Endpoints to create a new mentor and a new student (feature not present on frontend but works using api)

### API Endpoints
##### Mentors
- ```GET /``` - Fetch all mentors
- ```POST /``` - Create a new mentor
- ```POST /:id``` - Delete a mentor with given id
- ```POST /marksheet``` - Generate marksheet of a student
- ```PUT /lock``` - Lock profiles of all the students under a mentor
- ```POST /assign``` - Assign students to a mentor

##### Students
- ```GET /``` - Fetch all students
- ```GET /mentor``` - Fetch all students under a mentor
- ```GET /unassigned``` - Fetch all students having unassigned mentor
- ```POST /``` - Create a new student
- ```POST /update``` - Update grades of a student
- ```DELETE /:id``` - Delete a student by id

##### Auth
- ```GET /``` - Get logged in user
- ```POST /``` - Authorize user and get token
- ```DELETE /``` - Delete cookie / logout