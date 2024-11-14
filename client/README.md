# Task Management Application

## Table of Contents
- [Overview](#overview)
- [Live Project](#live-project)
- [Installation](#installation)
- [Features](#features)

## Overview

This Task Manager is a simple web app that helps users organize and track tasks. It allows for easy creation, editing, and categorization of tasks, with features like due dates and priority levels. Ideal for both personal and team use, it provides a clear view of task progress and deadlines.

## Live Project 

[Click Here](https://elite-task-six.vercel.app/)

## Installation

This guide will take you through the steps needed to set up and run the website on your local machine. No prior knowledge of React.js and Tailwind.css.

## Step By Step Installation

### Step 1: Clone the Repository
First, you need to clone the repository from GitHub to your local machine. Open the terminal (Command Prompt on Windows) and run the following command:

    git clone https://github.com/Laxminarayan-Birle/EliteTask.git

### Step 2: Navigate to the Project Directory
Change your directory to the project folder that you just cloned. In the terminal, run:

    cd EliteTask/client

### Step 3: Install Node.js Dependencies
Your project uses Node.js packages, which are listed in the package.json file. You need to install these packages using npm, which is included with Node.js. Run the following command in the terminal:

    npm i

### Step 4: Run the Project
Use the following command to run the project. 
### `npm start`
- Runs the app in the development mode.
- Open [localhost](http://localhost:3000) to view it in your browser. The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

- Launches the test runner in the interactive watch mode. See the section about running tests for more information.

### `npm run build`

- Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

- The build is minified and the filenames include the hashes.

---
### Your app is ready !!!
---

## Features 

### Dashboard

- Task List: View all tasks on a central dashboard.

    ![ALL Task](/Image_assets/all_task.png?raw=true "Add Task")

- Sections:
 
    - Upcoming: Shows tasks due soon.

        ![Upcoming Task](/Image_assets/upcoming_task.png?raw=true "Upcoming Task")

    - Overdue: Displays tasks past their due date.
        ![Missed Task](/Image_assets/missed_task.png?raw=true "Overdue")

    - Completed: Lists tasks marked as completed.
    ![Completed](/Image_assets/complete.png?raw=true "Completed")

### Task Management

- Add New Tasks: Users can add tasks with fields for title, description, due date, and 
priority level.

    ![Add Task](/Image_assets/add_task.png?raw=true "Add Task")

- Edit and Delete Tasks: Users can modify or remove tasks as needed.

    ![Edit Task](/Image_assets/edit_task.png?raw=true "Edit Task")


### Priority Levels

- Three Priority Levels: Tasks can be set as High, Medium, or Low priority.
- Update Priority: Users can adjust task priorities.

### Search and Filter

- Search: Quickly search tasks by title or description.

    ![Search Task](/Image_assets/search.png?raw=true "Edit Task")

- Filter by Priority and Completion: Filter tasks by priority level or completion status for organized task management.
    ![Edit Task](/Image_assets/sorting.png?raw=true "Edit Task")

    ![Priority Filter](/Image_assets/priority.png?raw=true "Priority Task")

