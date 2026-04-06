const fields=[
    {label:"Job Title",placeholder:"Enter Job Title", options:['Software Engineer', 'Product Manager', 'Designer', 'Data Analyst', 'Marketing Specialist', 'Sales Executive', 'Content Writer', 'Customer Support']},
    {label:"Location",placeholder:"Enter Job Location", options:['Remote', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'New York', 'San Francisco', 'London']},
    {label:"Job Type",placeholder:"Enter Job Type", options:['remote', 'hybrid', 'onsite']},
    {label:"Experience",placeholder:"Enter Experience", options:['fresher', '1-2 years', '3-5 years', '5-10 years', '10+ years']}
]
const content =
  '<h4>About The Job</h4><p>Write description here...</p><h4>Responsibilities</h4><ul><li>Add responsibilities here...</li></ul><h4>Qualifications and Skill Sets</h4><ul><li>Add required qualification and skill set here...</li></ul>';
export  {fields, content};
