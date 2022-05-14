const fs = require('fs');
const lineReader = require('line-reader');

const result = {};

// Hap-hazard script to convert the library's words to synonyms.json

lineReader.eachLine('../src/thesaurus/en_thesaurus.json', {}, (line) => {
    const parsed = JSON.parse(line);

    if (!result[parsed.word]) {
        result[parsed.word] = [];
    }

    try {
        result[parsed.word] = result[parsed.word].concat(parsed.synonyms)
    }
    catch (e) {
        console.log(result[parsed.word]);
    }
}, () => {
    fs.writeFileSync('../src/interface/synonyms.json', JSON.stringify(result));
})

