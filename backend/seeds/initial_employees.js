exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        { id: 1, name: 'Gabriel Espinhara da Silva', position: 'CEO', manager_id: null },
        { id: 2, name: 'CTO', position: 'CTO', manager_id: 1 },
        { id: 3, name: 'CFO', position: 'CFO', manager_id: 1 },
        { id: 4, name: 'COO', position: 'COO', manager_id: 1 },
        { id: 5, name: 'CMO', position: 'CMO', manager_id: 1 },
        { id: 6, name: 'CSO', position: 'CSO', manager_id: 1 },
        { id: 7, name: 'CIO', position: 'CIO', manager_id: 1 },
        { id: 8, name: 'Chief Compliance Officer', position: 'CCO', manager_id: 1 },
        { id: 9, name: 'Chief Human Resources Officer', position: 'CHRO', manager_id: 1 },
        { id: 10, name: 'VP of Engineering', position: 'VP Engineering', manager_id: 2 },
        { id: 11, name: 'VP of Finance', position: 'VP Finance', manager_id: 3 },
        { id: 12, name: 'VP of Operations', position: 'VP Operations', manager_id: 4 },
        { id: 13, name: 'VP of Marketing', position: 'VP Marketing', manager_id: 5 },
        { id: 14, name: 'VP of Sales', position: 'VP Sales', manager_id: 6 },
        { id: 15, name: 'VP of IT', position: 'VP IT', manager_id: 7 },
        { id: 16, name: 'Engineering Manager', position: 'Engineering Manager', manager_id: 10 },
        { id: 17, name: 'Finance Manager', position: 'Finance Manager', manager_id: 11 },
        { id: 18, name: 'Operations Manager', position: 'Operations Manager', manager_id: 12 },
        { id: 19, name: 'Marketing Manager', position: 'Marketing Manager', manager_id: 13 },
        { id: 20, name: 'Sales Manager', position: 'Sales Manager', manager_id: 14 },
        { id: 21, name: 'IT Manager', position: 'IT Manager', manager_id: 15 },
      ]);
    });
};
