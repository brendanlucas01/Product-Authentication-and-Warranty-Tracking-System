const spawner = require('child_process').spawn;

//string
const data_to_pass_in = 'Send this to python Script';


//array
// const data_to_pass_in = ['Send this to python Script'];

// object
// const data_to_pass_in = {
//     data_send: "Send this to python Script",
//     data_returned: undefined
// }

console.log("Data send to the python Script:", data_to_pass_in);

const python_process = spawner('python', ['../python_folder/python_test_file.py',data_to_pass_in]);

// const python_process = spawner('python', ['./python_test_file.py',JSON.stringify(data_to_pass_in)]);

python_process.stdout.on("data",(data)=>{
    console.log("Data received from python Script:",data.toString());
});

// python_process.stdout.on("data",(data)=>{
//     console.log("Data received from python Script:",JSON.parse(data.toString()));
// });