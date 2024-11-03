# Readme File for Kafka Polling API

## Setup for Kafka and Zookeeper

## Backend live url
https://polling-system-r0tk.onrender.com

## Database access
just add your credentials in db.js file under configs file

## check number 5 points for real time votes updates using socker io



You do not need to install Kafka on your local system. I have set up Kafka and Zookeeper on an AWS EC2 instance using Docker. The broker address is configured to point to the IP address of that EC2 instance.

### Note
As I am using a micro instance with limited storage, Kafka may crash due to storage issues. If you encounter any errors while testing the code, please let me know, and I will upgrade the storage.

## Code Setup

1. **Install Dependencies**
   - Run the following command to install the necessary packages:
     ```bash
     npm install
     ```
   - If a package does not install, you can install it individually. For example:
     ```bash
     npm install nodemon
     ```

2. **Start the Server**
   - After all dependencies are installed, start the server using:
     ```bash
     npm run dev
     ```

## APIs and Working

### Overview

Have a look at the APIs, and you'll get a complete understanding of the functionality of the code.

### API Endpoints

1. **Create a Poll**
   - **Endpoint:** `api/v1/poll`
   - **Method:** POST
   - **Request Body:**
     ```json
     {
       "poll": "question",
       "option": ["option1", "option2"]
     }
     ```
   - **Description:** This endpoint creates a new poll with the provided question and options.

2. **Get All Polls**
   - **Endpoint:** `api/v1/poll`
   - **Method:** GET
   - **Description:** This endpoint returns all the poll details.

3. **Vote for a Poll**
   - **Endpoint:** `api/v1/poll/:id/vote`
   - **Method:** POST
   - **Request Parameters:**
     - `:id` - The ID of the poll you want to vote for.
   - **Request Body:**
     ```json
     {
       "votedBy": "saurabh",
       "option": 1
     }
     ```
   - **Description:** This endpoint allows you to vote for a specific poll. You need to provide the poll ID in the request parameters and the voter's name along with the selected option ID in the request body under option field.

4. **Get Poll Leaderboard**
   - **Endpoint:** `api/v1/poll/leaderboard`
   - **Method:** GET
   - **Description:** This endpoint provides complete details about the leaderboard for the polls, returning the poll options sorted in descending order according to the number of votes received.

5. **Real-Time Updates for Voting**
   - **Endpoint:** `/api/polls/realtimeUpdate`
   - **Method:** GET
   - **Description:** This endpoint provides real-time updates whenever a user votes for a poll, showing who voted for which poll and updating the leaderboard accordingly.

### Testing Polling APIs

To test the polling APIs, you can use tools like Postman or curl to make requests to the endpoints described above. Make sure to adjust the request body as specified and use the correct HTTP methods.

Feel free to explore the APIs, and you'll gain a comprehensive understanding of the application's functionality.
