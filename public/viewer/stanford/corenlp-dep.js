var posEntities = [];
var nerEntities = [];
var depsRelations = [];

var entityTypesSet = {};
var entityTypes = [];


/**
 * Register a relation type (an arc) for Brat
 */
var relationTypesSet = {};
var relationTypes = [];
/**
 * Add the startsWith function to the String class
 */
if (typeof String.prototype.startsWith !== 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) === 0;
  };
}

function isInt (value) {
  return !isNaN(value) && (function (x) { return (x | 0) === x; })(parseFloat(value))
}

/**
 * A reverse map of PTB tokens to their original gloss
 */
var tokensMap = {
  '-LRB-': '(',
  '-RRB-': ')',
  '-LSB-': '[',
  '-RSB-': ']',
  '-LCB-': '{',
  '-RCB-': '}',
  '``': '"',
  '\'\'': '"',
};

/**
 * A mapping from part of speech tag to the associated visualization color
 */
function posColor (posTag) {
  if (posTag.startsWith('N')) {
    return '#A4BCED';
  } else if (posTag.startsWith('V') || posTag.startsWith('M')) {
    return '#ADF6A2';
  } else if (posTag.startsWith('P')) {
    return '#CCDAF6';
  } else if (posTag.startsWith('I')) {
    return '#FFE8BE';
  } else if (posTag.startsWith('R') || posTag.startsWith('W')) {
    return '#FFFDA8';
  } else if (posTag.startsWith('D') || posTag === 'CD') {
    return '#CCADF6';
  } else if (posTag.startsWith('J')) {
    return '#FFFDA8';
  } else if (posTag.startsWith('T')) {
    return '#FFE8BE';
  } else if (posTag.startsWith('E') || posTag.startsWith('S')) {
    return '#E4CBF6';
  } else if (posTag.startsWith('CC')) {
    return '#FFFFFF';
  } else if (posTag === 'LS' || posTag === 'FW') {
    return '#FFFFFF';
  } else {
    return '#E3E3E3';
  }
}

/**
 * A mapping from named entity tag to the associated visualization color
 */
function nerColor (nerTag) {
  if (nerTag === 'PERSON') {
    return '#FFCCAA';
  } else if (nerTag === 'ORGANIZATION') {
    return '#8FB2FF';
  } else if (nerTag === 'MISC') {
    return '#F1F447';
  } else if (nerTag === 'LOCATION' || nerTag === 'COUNTRY' || nerTag === 'STATE_OR_PROVINCE' || nerTag === 'CITY') {
    return '#95DFFF';
  } else if (nerTag === 'DATE' || nerTag === 'TIME' || nerTag === 'DURATION' || nerTag === 'SET') {
    return '#9AFFE6';
  } else if (nerTag === 'MONEY') {
    return '#FFFFFF';
  } else if (nerTag === 'PERCENT') {
    return '#FFA22B';
  } else {
    return '#E3E3E3';
  }
}

var d3_category18 = {
  // Just like d3_category20 but no grays!
  name: 'd3_category_18',
  colors: [
    '#aec7e8',
    '#ffbb78',
    '#98df8a',
    '#ff9896',
    '#c5b0d5',
    '#c49c94',
    '#f7b6d2',
    '#dbdb8d',
    '#9edae5',
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#bcbd22',
    '#17becf',
  ]
};

function generateRandomColor () {
  return "#" + Math.random().toString(16).slice(2, 8);
}

function generateNextColor (i, palette) {
  if (palette && i < palette.colors.length) {
    return palette.colors[i];
  } else {
    return generateRandomColor();
  }
}

function getTagColor (tag, colorIndex, colors) {
  var ci = colorIndex[tag];
  if (ci == null) {
    ci = colors.length;
    colorIndex[tag] = ci;
    colors.push(generateNextColor(ci, d3_category18));
  }
  return colors[ci];
}

/**
 * A mapping from coref values to the associated visualization color
 */
var corefColorIndex = {};
var corefColors = [];
function corefColor (corefTag) {
  if (corefTag === "MENTION") {
    return '#FFE000';
  } else {
    return getTagColor(corefTag, corefColorIndex, corefColors);
  }
}

var speakerColorIndex = {};
var speakerColors = [];
function speakerColor (tag) {
  return getTagColor(tag, speakerColorIndex, speakerColors);
}


/**
 * A mapping from sentiment value to the associated
 * visualization color
 */
function sentimentColor (sentiment) {
  if (sentiment === "VERY POSITIVE") {
    return '#00FF00';
  } else if (sentiment === "POSITIVE") {
    return '#7FFF00';
  } else if (sentiment === "NEUTRAL") {
    return '#FFFF00';
  } else if (sentiment === "NEGATIVE") {
    return '#FF7F00';
  } else if (sentiment === "VERY NEGATIVE") {
    return '#FF0000';
  } else {
    return '#E3E3E3';
  }
}


/**
 * Get a list of annotators, from the annotator option input.
 */
function annotators () {
  var annotators = "tokenize,ssplit";
  if ($('#language').val() === 'de' | $('#language').val() === 'fr' | $('#language').val() === 'es') {
    annotators += ",mwt";
  }
  $('#annotators').find('option:selected').each(function () {
    annotators += "," + $(this).val();
  });
  return annotators;
}

/**
 * Get the input date
 */
function date () {
  function f (n) {
    return n < 10 ? '0' + n : n;
  }
  var date = new Date();
  var M = date.getMonth() + 1;
  var D = date.getDate();
  var Y = date.getFullYear();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  return "" + Y + "-" + f(M) + "-" + f(D) + "T" + f(h) + ':' + f(m) + ':' + f(s);
}


//-----------------------------------------------------------------------------
// Constituency parser
//-----------------------------------------------------------------------------
function ConstituencyParseProcessor () {
  var parenthesize = function (input, list) {
    if (list === undefined) {
      return parenthesize(input, []);
    } else {
      var token = input.shift();
      if (token === undefined) {
        return list.pop();
      } else if (token === "(") {
        list.push(parenthesize(input, []));
        return parenthesize(input, list);
      } else if (token === ")") {
        return list;
      } else {
        return parenthesize(input, list.concat(token));
      }
    }
  };

  var toTree = function (list) {
    if (list.length === 2 && typeof list[1] === 'string') {
      return { label: list[0], text: list[1], isTerminal: true };
    } else if (list.length >= 2) {
      var label = list.shift();
      var node = { label: label };
      var rest = list.map(function (x) {
        var t = toTree(x);
        if (typeof t === 'object') {
          t.parent = node;
        }
        return t;
      });
      node.children = rest;
      return node;
    } else {
      return list;
    }
  };

  var indexTree = function (tree, tokens, index) {
    index = index || 0;
    if (tree.isTerminal) {
      tree.token = tokens[index];
      tree.tokenIndex = index;
      tree.tokenStart = index;
      tree.tokenEnd = index + 1;
      return index + 1;
    } else if (tree.children) {
      tree.tokenStart = index;
      for (var i = 0; i < tree.children.length; i++) {
        var child = tree.children[i];
        index = indexTree(child, tokens, index);
      }
      tree.tokenEnd = index;
    }
    return index;
  };

  var tokenize = function (input) {
    return input.split('"')
      .map(function (x, i) {
        if (i % 2 === 0) { // not in string
          return x.replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ');
        } else { // in string
          return x.replace(/ /g, "!whitespace!");
        }
      })
      .join('"')
      .trim()
      .split(/\s+/)
      .map(function (x) {
        return x.replace(/!whitespace!/g, " ");
      });
  };

  var convertParseStringToTree = function (input, tokens) {
    var p = parenthesize(tokenize(input));
    if (Array.isArray(p)) {
      var tree = toTree(p);
      // Correlate tree with tokens
      indexTree(tree, tokens);
      return tree;
    }
  };

  this.process = function (annotation) {
    for (var i = 0; i < annotation.sentences.length; i++) {
      var s = annotation.sentences[i];
      if (s.parse) {
        s.parseTree = convertParseStringToTree(s.parse, s.tokens);
      }
    }
  }
}

function addEntityType (name, type, coarseType) {
  if (typeof coarseType === "undefined") {
    coarseType = type;
  }
  // Don't add duplicates
  if (entityTypesSet[type]) return;
  entityTypesSet[type] = true;
  // Get the color of the entity type
  color = '#ffccaa';
  if (name === 'POS') {
    color = posColor(type);
  } else if (name === 'NER') {
    color = nerColor(coarseType);
  } else if (name === 'NNER') {
    color = nerColor(coarseType);
  } else if (name === 'SPEAKER') {
    color = speakerColor(coarseType);
  } else if (name === 'COREF') {
    color = corefColor(coarseType);
  } else if (name === 'ENTITY') {
    color = posColor('NN');
  } else if (name === 'RELATION') {
    color = posColor('VB');
  } else if (name === 'LEMMA') {
    color = '#FFFFFF';
  } else if (name === 'SENTIMENT') {
    color = sentimentColor(type);
  } else if (name === 'LINK') {
    color = '#FFFFFF';
  } else if (name === 'KBP_ENTITY') {
    color = '#FFFFFF';
  }
  // Register the type
  entityTypes.push({
    type: type,
    labels: [type],
    bgColor: color,
    borderColor: 'darken'
  });
}

function addRelationType (type, symmetricEdge) {
  // Prevent adding duplicates
  if (relationTypesSet[type]) return;
  relationTypesSet[type] = true;
  // Default arguments
  if (typeof symmetricEdge === 'undefined') { symmetricEdge = false; }
  // Add the type
  relationTypes.push({
    type: type,
    labels: [type],
    dashArray: (symmetricEdge ? '3,3' : undefined),
    arrowHead: (symmetricEdge ? 'none' : undefined),
  });
}

function render (divId, data) {

  posEntities = [];
  nerEntities = [];
  depsRelations = [];

  entityTypesSet = {};
  entityTypes = [];


  /**
   * Register a relation type (an arc) for Brat
   */
  relationTypesSet = {};
  relationTypes = [];
  //
  // Construct text of annotation
  //
  currentText = [];  // GLOBAL
  currentSentences = data.sentences;  // GLOBAL
  data.sentences.forEach(function (sentence) {
    for (var i = 0; i < sentence.tokens.length; ++i) {
      var token = sentence.tokens[i];
      var word = token.word;
      if (!(typeof tokensMap[word] === "undefined")) {
        word = tokensMap[word];
      }
      if (i > 0) { currentText.push(' '); }
      token.characterOffsetBegin = currentText.length;
      for (var j = 0; j < word.length; ++j) {
        currentText.push(word[j]);
      }
      token.characterOffsetEnd = currentText.length;
    }
    currentText.push('\n');
  });
  currentText = currentText.join('');

  for (var sentI = 0; sentI < data.sentences.length; ++sentI) {
    var sentence = data.sentences[sentI];
    var index = sentence.index;
    var tokens = sentence.tokens;
    var deps = sentence['basicDependencies'];
    var deps2 = sentence['enhancedPlusPlusDependencies'];
    var parseTree = sentence['parseTree'];

    // Speakers
    if (tokens.length > 0 && typeof tokens[0].speaker !== 'undefined') {
      var speaker = tokens[0].speaker;
      var speakerId = 'S(' + speaker + ')';
      addEntityType('SPEAKER', speakerId);
      var begin = parseInt(tokens[0].characterOffsetBegin);
      var end = parseInt(tokens[tokens.length - 1].characterOffsetEnd);
      speakerEntities.push(['sent' + sentI, speakerId, [[begin, end]]]);
    }

    // POS tags
    /**
     * Generate a POS tagged token id
     */
    function posID (i) {
      return 'POS_' + sentI + '_' + i;
    }
    if (tokens.length > 0 && typeof tokens[0].pos !== 'undefined') {
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var pos = token.pos;
        var begin = parseInt(token.characterOffsetBegin);
        var end = parseInt(token.characterOffsetEnd);
        addEntityType('POS', pos);
        posEntities.push([posID(i), pos, [[begin, end]]]);
      }
    }

    // Constituency parse
    // Carries the same assumption as NER
    if (parseTree && !useDagre) {
      var parseEntities = [];
      var parseRels = [];
      function processParseTree (tree, index) {
        tree.visitIndex = index;
        index++;
        if (tree.isTerminal) {
          parseEntities[tree.visitIndex] = posEntities[tree.tokenIndex];
          return index;
        } else if (tree.children) {
          addEntityType('PARSENODE', tree.label);
          parseEntities[tree.visitIndex] =
            ['PARSENODE_' + sentI + '_' + tree.visitIndex, tree.label,
            [[tokens[tree.tokenStart].characterOffsetBegin, tokens[tree.tokenEnd - 1].characterOffsetEnd]]];
          var parentEnt = parseEntities[tree.visitIndex];
          for (var i = 0; i < tree.children.length; i++) {
            var child = tree.children[i];
            index = processParseTree(child, index);
            var childEnt = parseEntities[child.visitIndex];
            addRelationType('pc');
            parseRels.push(['PARSEEDGE_' + sentI + '_' + parseRels.length, 'pc', [['parent', parentEnt[0]], ['child', childEnt[0]]]]);
          }
        }
        return index;
      }
      processParseTree(parseTree, 0);
      cparseEntities = cparseEntities.concat(cparseEntities, parseEntities);
      cparseRelations = cparseRelations.concat(parseRels);
    }

    // Dependency parsing
    /**
     * Process a dependency tree from JSON to Brat relations
     */
    function processDeps (name, deps) {
      var relations = [];
      // Format: [${ID}, ${TYPE}, [[${ARGNAME}, ${TARGET}], [${ARGNAME}, ${TARGET}]]]
      for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];
        var governor = dep.governor - 1;
        var dependent = dep.dependent - 1;
        if (governor == -1) continue;
        addRelationType(dep.dep);
        relations.push([name + '_' + sentI + '_' + i, dep.dep, [['governor', posID(governor)], ['dependent', posID(dependent)]]]);
      }
      return relations;
    }
    // Actually add the dependencies
    if (typeof deps !== 'undefined') {
      depsRelations = depsRelations.concat(processDeps('dep', deps));
    }


    // NER tags
    // Assumption: contiguous occurrence of one non-O is a single entity
    if (tokens.some(function (token) { return token.ner; })) {
      for (var i = 0; i < tokens.length; i++) {
        var ner = tokens[i].ner || 'O';
        var normalizedNER = tokens[i].normalizedNER;
        if (typeof normalizedNER === "undefined") {
          normalizedNER = ner;
        }
        if (ner == 'O') continue;
        var j = i;
        while (j < tokens.length - 1 && tokens[j + 1].ner == ner) j++;
        addEntityType('NER', ner, ner);
        nerEntities.push(['NER_' + sentI + '_' + i, ner, [[tokens[i].characterOffsetBegin, tokens[j].characterOffsetEnd]]]);
        if (ner != normalizedNER) {
          addEntityType('NNER', normalizedNER, ner);
          nerEntities.push(['NNER_' + sentI + '_' + i, normalizedNER, [[tokens[i].characterOffsetBegin, tokens[j].characterOffsetEnd]]]);

        }
        i = j;
      }
    }

    // Entity Links
    // Carries the same assumption as NER
    if (tokens.length > 0) {
      for (var i = 0; i < tokens.length; i++) {
        var link = tokens[i].entitylink;
        if (link == 'O' || typeof link === 'undefined') continue;
        var j = i;
        while (j < tokens.length - 1 && tokens[j + 1].entitylink == link) j++;
        addEntityType('LINK', link);
        linkEntities.push(['LINK_' + sentI + '_' + i, link, [[tokens[i].characterOffsetBegin, tokens[j].characterOffsetEnd]]]);
        i = j;
      }
    }

  }  // End sentence loop
  function embed (container, entities, relations, reverse) {
    var text = currentText;
    if (reverse) {
      var length = currentText.length;
      for (var i = 0; i < entities.length; ++i) {
        var offsets = entities[i][2][0];
        var tmp = length - offsets[0];
        offsets[0] = length - offsets[1];
        offsets[1] = tmp;
      }
      text = text.split("").reverse().join("");
    }
    if ($('#' + container).length > 0) {
      Util.embed(container,
        { entity_types: entityTypes, relation_types: relationTypes },
        { text: text, entities: entities, relations: relations }
      );
    }
  }
  embed(divId, posEntities, depsRelations);
  embed('ner', nerEntities);
}