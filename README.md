I created this repository as a side project to practice and conceptualize the concepts learned in the course https://www.udemy.com/course/elasticsearch-complete-guide. It will also help a reference and starting point when implementing ES in my personal projects.

While I didn't cover all the topics from the course, but I belive that what I've defined in this project will be useful for wide range of usecases.



The project is split into 3 sections:
- **Index Management**

    In this module, I covered the basics, including creating an index, defining its mapping, indexing a document, changing the mapping by adding a new column, and also, bulk importing data into the index.
- **Crud Operation**
    I implemented a basic CRUD functionality for the index.
    Something interesting from this implementation is that even though I defined a mapping, during development I added properties that were not listed by mistake, and they were also insterted to the document. This behavior can be controlled by setting the property *dynamic* to **false** to ignore the unknown fields, or **strict** to throw an error if a non-mapped property is attempted to insert
        
- **Queries**
    This is perhaps the more useful section, as I used the core functionalities provided by elasticsearch.
    Below, there is a brief review of each method

    -   andQuery(): With **bool** and  **must** queries replicats an *AND* behavior, documents to do not match the conditions here, will not be fetched.

    - orQuery(): To mimic an *OR* condition, we need to use the **should** query. However, if the query only contains this condition, it could be treated as a **must** condition. If multiple should clauses are defined, at least one of them has to match(They will be ranked). This paramater can be changed by specifying the *minimum_should_match* property. 

    -   andWithOrQuery() & orWithAndQuery(): These queries make use of a combination of multiple **must** and **should** conditions, where always the condition of must is required, and the should condition is optional, but those documents that match, get a higher score.

    -   wildcardQuery(): The wildcard feature provides the flexibility to perform pattern searches, for example, using the asterisk character, that represents zero or more characters, jo*, could match john, jo, jordan. And the question mark character represents a single character. An example could be: sm?th will match smith and smyth. I had more issues running a wildcard query over analyzed fields, however it is still possible to perform this type of query on them.

    -   rangeQuery(): A basic range query usually performs on numbers. This makes use of the well-known gt(e),lt(e) expression

    -   fullTextSearchQuery(): This is a deal breaker when choosing ES. It lets you run queries over a text field, for non-exact matches.
                            For example, the "Elasticsearch tutorial" will probably match against the text "Learning Elasticsearch: A comprehensive tutorial". Thanks to that the text field is an analyzed property.

    -   columnExists(): Thanks to the flexibility ES provides, you can insert documents that might not contain all the fields defined in the mapping, you could then, search for this documents with the **exists** query. A default value can alse be set using Processors.

    -   phraseQuery(): The key difference between the **phrase query** and the **match query** is that the order matters. It ensures that the query matches only when the phrase as a whole exists in the field. The *slop* parameter can provide flexibility when using this query

    -   paginatedQuery(): Limit the number of documents returned by providing limit and offset parameters

    -   relevanceQuery(): You can instruct ES to rank a field with a higher score, for example, if we have a document with title and description, we might want to prioritize the title over description, even if the description has more tokens that match (Ranking is a topic that I didn't explore in this project, so boosting a field doesn't mean that it will always return it first).

    -   boostingQuery(): The boosting query lets you define a negative score for specific cases. In the example provided by the project, we searched for the products with the price of 699.99, but reduce the scoring for those products from the XYZ Corporation brand.
