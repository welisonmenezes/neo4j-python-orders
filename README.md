# Guideline Geral

## Informações

Eu desenvolvi com Flask e React, por isso os diretórios: 'frontend' e 'application'.

O diretório de seu interesse é o 'application'. Nele contém a aplicação Python/Flask com o build do frontend incluso. Portanto, o root do projeto é o diretório 'application'.


## Database

No diretório 'resources' tem um arquivo chamado 'neo4j-scripts.txt'. Nele você pode encontrar os scripts para carregar seu database com os dados que eu utilizei no exemplo.

No diretório 'application', no arquivo 'app.py', na linha 15, você deverá informar a senha de acesso ao seu banco de dados Neo4j.


## Ambiente Virtual

Caso deseje executar sua aplicação em um ambiente virtual do Python, certifique-se de estar no diretório 'application' e execute os seguites comandos:

> python -m venv venv  
> cd venv/Scripts
> activate
> cd ../..

Não é obrigatório mas é útil, pois você não instalará as dependências do projeto globalmente, apenas dentro deste ambiente virtual.


## Inicialização

Primeiro, certifique-se de estar no diretório 'application'.

As dependências do projeto estão listadas no arquivo 'requirements.txt'. Para instalá-las execute o seguinte comando:

> pip install -r requirements.txt

Após a instalação das dependências execute a aplicação. Para isso rode o seguinte commando:

> python -m flask run --reload

Você notará que será levantado um servidor rodando na porta 5000. Acesse e divirta-se.


#### Qualquer dúvida, estou à disposição.