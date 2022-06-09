

Interação UI <-> Website

-> GET /recipes -> Listagem de receitas (inclui link para adicionar receita a grupo: exº <a href="/grupos/receipeToAdd/1">Receipe 1</a>)
-> GET /grupos/receipeToAdd/1 -> Página com formulário que contém lista dos grupos do utilizador dentro de um form com action="/grupos/receipeToAdd/1" method="POST"
-> POST /grupos/receipeToAdd/1 { gruopId=100 } -> Redirect /groups/100



{
    name: "g1",
    description: "Dg1",
    recipes: [1, 2, 3]
}

PUT /groups/_doc/100
{
    name: "g1",
    description: "Dg1",
    recipes: [1, 2, 3, 4]
}

POST /groups/_update/100
POST test/_update/1
{
  "script": {
    "source": "ctx._source.recipes.add(params.recipe)",
    "lang": "painless",
    "params": {
      "recipe": {id: 4, name='recipe4'},
    }
  }
}