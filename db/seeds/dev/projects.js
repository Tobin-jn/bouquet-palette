
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          name:'Winter'
        }, 'id')

        .then(project => {
          return knex('palettes').insert({
            id:1, 
            name:'Cold', 
            hex1: '#57CD617',
            hex2: '#112617',
            hex3: '#22AA17',
            hex4: '#3326FF',
            hex5: '#AA2617',
            project_id: 1
          })
        })

        .then(() => console.log('Seeding Complete!'))
        .catch(error => console.log(`Error seeding data: ${error.message}`))
      ])

    })
    .catch(error => console.log(`Error seeding data: ${error.message}`))
};
