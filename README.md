## Hi there 👋
# Social Service Token Application

This is a full-stack application built with **Node.js**, **Express**, **TypeScript**, **MySQL**, and **React Native**. The purpose of this application is to facilitate a social service token system where User1 provides a service, and User2 selects a service. Once the service is completed, User1 receives money tokens, which they can claim once a week.

## Project Overview

- **Backend**: Node.js, Express, TypeScript, MySQL
- **Frontend**: React Native

### Key Features

- **Service Selection**:    User1 offers a range of services through the application, which could include anything from household chores to professional services. These services are made visible on the platform, allowing User2 to browse and select a service that suits their needs. Each service listing includes detailed information such as service description, duration, and the token reward User1 will receive upon completion. User2 can review service providers, view their ratings, and select the most appropriate provider for the task. Once a service is selected, the app facilitates communication between the two users for scheduling and completion.

- **Token System**: Once the service is marked as complete, User1 is rewarded with SST tokens.
- **Token Claiming**: User1 can claim their tokens once per week.

## Prerequisites

Ensure that the following are installed on your system:

- **Node.js** v18 or later
- **MySQL** database
- **React Native** development environment (with Android Studio or Xcode for iOS)

## Setup Instructions

### 1. Backend Setup

1. Clone the repository and navigate to the project root directory:

    ```bash
    git clone <repository-url>
    cd <project-root>
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and provide the necessary environment variables:

    ```
    PORT=<your-server-port>
    DB_HOST=<your-mysql-host>
    DB_USER=<your-mysql-username>
    DB_PASS=<your-mysql-password>
    DB_NAME=<your-mysql-database-name>
    ```

4. To start the backend server, use the following command:

    ```bash
    npm run sam
    ```

    This will start the server, which listens for requests on the specified port.

### 2. Frontend Setup (React Native)

1. Navigate to the `frontend` folder for the React Native code:

    ```bash
    cd frontend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Run the React Native app:

    - For Android:

        ```bash
        npx react-native run-android
        ```

    - For iOS:

        ```bash
        npx react-native run-ios
        ```

### 3. MySQL Setup

- Ensure that you have MySQL installed and running on your local machine or server.
- Create a new database for the application and provide the credentials in the `.env` file.



### 4. Available Scripts

### Backend

- **`npm run sam`**: Starts the backend server.



## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

    ```

<!--
**samthesis/samthesis** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Here are some ideas to get you started:

- 🔭 I’m currently working on ...
- 🌱 I’m currently learning ...
- 👯 I’m looking to collaborate on ...
- 🤔 I’m looking for help with ...
- 💬 Ask me about ...
- 📫 How to reach me: ...
- 😄 Pronouns: ...
- ⚡ Fun fact: ...
-->
