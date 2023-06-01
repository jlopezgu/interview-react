# React App

React project created using create-react-app. 

## Installation
Cloning the code into local.
```shell
git clone https://github.com/jlopezgu/interview-react.git
```

Use the package manager to install dependencies.
```shell
npm install
```

## Running locally
Before running Django make sure you have a mysql instance running with correct ports and properly configured in 
**/website/website/settings.py**
```shell
npm start
```

## How it works?
For this version only UI is working and no cookies are being used so every time you refresh the browser all data will 
be deleted.

Click on Add person in order to create a first person.

Fill out the form

For "Hobbies" you will need to type a hobby and then press enter. In case you made a mistake you can easily delete it and
create a new one by clicking on the delete button.

Once all fields are filled the submit button will be enabled, and you should be able to see it in the main table.

Each person added will be displayed and you should be able to delete them individually. 

## License
[MIT](https://choosealicense.com/licenses/mit/)