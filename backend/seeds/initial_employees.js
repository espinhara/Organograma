exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('employees').del()
    .then(function () {
      // Inserts seed entries
      return knex('employees').insert([
        { id: 1, name: 'Matheus/Paloma Lopes', position: 'Diretoria', manager_id: null },
        { id: 2, name: 'Paloma Ribeiro', position: 'Gerente Geral', manager_id: 1 },
        { id: 3, name: 'Gabriel Hergesel', position: 'Gerente da Unidade Amor Saúde', manager_id: 2 },
        { id: 4, name: 'Editar nome', position: 'Coor. Adm', manager_id: 3 },
        { id: 5, name: 'Editar nome', position: 'Coor. Odonto', manager_id: 3 },
        { id: 6, name: 'Editar nome', position: 'Lider Exames', manager_id: 3 },
        { id: 7, name: 'Editar nome', position: 'Lider Exames', manager_id: 3 },
        { id: 8, name: 'Editar nome', position: 'RT', manager_id: 3 },
        { id: 9, name: 'Editar nome', position: 'Lider Call Center', manager_id: 3 },
        { id: 10, name: 'Editar nome', position: 'Finaceiro', manager_id: 4 },
        { id: 11, name: 'Editar nome', position: 'TSB', manager_id: 5 },
        { id: 12, name: 'Editar nome', position: 'Recepição Life', manager_id: 6 },
        { id: 13, name: 'Editar nome', position: 'Recepção AME', manager_id: 7 },
        { id: 14, name: 'Editar nome', position: 'Técnicas Enfermagem', manager_id: 8 },
        { id: 15, name: 'Editar nome', position: 'Telefonistas', manager_id: 9 },
      ]);
    });
};
