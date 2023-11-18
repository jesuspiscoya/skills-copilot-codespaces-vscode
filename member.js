function skillsMember() {
    var skills = {
        name: 'John Doe',
        age: 30,
        address: '123 Main St',
        skills: ['HTML', 'CSS', 'JS'],
        getSkills: function() {
            return this.skills;
        }
    }
    console.log(skills.getSkills());
}