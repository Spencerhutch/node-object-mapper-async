"use strict";

var om = require('../')
  , test = require('tape')
  ;

test('get value - simple', function (t) {
  var key = 'foo';

  var obj = {
    "foo": "bar"
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - one level deep', function (t) {
  var key = 'foo.baz';

  var obj = {
    "foo": {
      "baz": "bar"
    }
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - two levels deep', function (t) {
  var key = 'foo.baz.fog';

  var obj = {
    "foo": {
      "baz": {
        "fog": "bar"
      }
    }
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - one level deep and item is a array', function (t) {
  var key = 'foo.baz[]';

  var obj = {
    "foo": {
      "baz": ["bar"]
    }
  };

  var expect = ["bar"];

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - one level deep and first item of array', function (t) {
  var key = 'foo.baz[0]';

  var obj = {
    "foo": {
      "baz": ["bar"]
    }
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - one level deep and first item of array and one level', function (t) {
  var key = 'foo.baz[0].fog';

  var obj = {
    "foo": {
      "baz": [{
        "fog": "bar"
      }]
    }
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - one level deep and first item of array and two levels', function (t) {
  var key = 'foo.baz[0].fog.baz';

  var obj = {
    "foo": {
      "baz": [{
        "fog": {
          "baz": "bar"
        }
      }]
    }
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});
test('get value - crazy', function (t) {
  var key = 'foo.baz[0].fog[1].baz';

  var obj = {
    "foo": {
      "baz": [{
        "fog": [, {
          "baz": "bar"
        }]
      }]
    }
  };

  var expect = "bar";

  var result = om.getKeyValue(obj, key);

  t.deepEqual(expect, result);
  t.end();
});

test('set value - simple', function (t) {
  var key = 'foo';
  var value = 'bar';

  var expect = {
    foo: "bar"
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});
test('set value - one level deep', function (t) {
  var key = 'foo.bar';
  var value = 'baz';

  var expect = {
    foo: {
      bar: 'baz'
    }
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});
test('set value - two levels deep', function (t) {
  var key = 'foo.bar.baz';
  var value = 'foo';

  var expect = {
    foo: {
      bar: {
        baz: 'foo'
      }
    }
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});
test('set value - one level deep inside array', function (t) {
  var key = 'foo.bar[]';
  var value = 'baz';

  var expect = {
    foo: {
      bar: ['baz']
    }
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});
test('set value - one level deep inside array with one level deep', function (t) {
  var key = 'foo.bar[].baz';
  var value = 'foo';

  var expect = {
    foo: {
      bar: [{
        baz: 'foo'
      }]
    }
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});
test('set value - one level deep inside array at defined index with one level deep', function (t) {
  var key = 'foo.bar[1].baz';
  var value = 'foo';

  var expect = {
    foo: {
      bar: [0, {
        baz: 'foo'
      }]
    }
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});
test('set value - crazy', function (t) {
  var key = 'foo.bar[1].baz[2].thing';
  var value = 'foo';

  var expect = {
    foo: {
      bar: [, {
        baz: [0, 1, {
          thing: 'foo'
        }]
      }]
    }
  };

  var result = om.setKeyValue({}, key, value);

  t.deepEqual(expect, result);
  t.end();
});

//test('array mapping - simple', function (t) {
//  var obj = {
//    "comments" : [
//      { a : 'a1', b : 'b1'}
//      , { a : 'a2', b : 'b2'}
//    ]
//  };
//
//  var map = {
//    "comments[].a" : ["comments[].c"]
//    , "comments[].b" : ["comments[].d"]
//  };
//
//  var expect = {
//    "comments" : [
//      { c : 'a1', d : 'b1' }
//      , { c : 'a2', d : 'b2' }
//    ]
//  }
//
//  var result = om(obj, map);
//
//  t.deepEqual(expect, result);
//  t.end();
//});
//
//test('array mapping - simple deep', function (t) {
//  var obj = {
//    "thing" : {
//      "comments" : [
//        { a : 'a1', b : 'b1'}
//        , { a : 'a2', b : 'b2'}
//      ]
//    }
//  };
//
//  var map = {
//    "thing.comments[].a" : ["thing.comments[].c"]
//    , "thing.comments[].b" : ["thing.comments[].d"]
//  };
//
//  var expect = {
//    "thing" : {
//      "comments" : [
//        { c : 'a1', d : 'b1' }
//        , { c : 'a2', d : 'b2' }
//      ]
//    }
//  }
//
//  var result = om(obj, map);
//
//  t.deepEqual(expect, result);
//  t.end();
//});
//
//test('array mapping - simple to deep array', function (t) {
//  var obj = {
//    "quantity" : 100
//  };
//
//  var map = {
//    "quantity" : ["stock[].info.quantity"]
//  };
//
//  var expect = {
//    stock: [{
//      info: {
//        quantity: 100
//      }
//    }]
//  }
//
//  var result = om(obj, map);
//
//  t.deepEqual(expect, result);
//  t.end();
//});
//
//test('array mapping - from/to specific indexes', function (t) {
//  var obj = {
//    "comments" : [
//      { a : 'a1', b : 'b1'}
//      , { a : 'a2', b : 'b2'}
//    ]
//  };
//
//  var map = {
//    "comments[0].a" : ["comments[1].c"]
//    , "comments[0].b" : ["comments[1].d"]
//  };
//
//  var expect = {
//    "comments" : [
//      , { c : 'a1', d : 'b1' }
//    ]
//  }
//
//  var result = om(obj, map);
//
//  t.deepEqual(expect, result);
//  t.end();
//});
//
//test('original various tests', function (t) {
//  var merge = require('../').merge
//
//  var obj = {
//    "sku" : "12345"
//    , "upc" : "99999912345X"
//    , "title" : "Test Item"
//    , "descriptions": ["Short description", "Long description"]
//    , "length" : 5
//    , "width" : 2
//    , "height" : 8
//    , "inventory" : {
//      "onHandQty" : 0
//      , "replenishQty" : null
//    }
//    , "price" : 100
//  };
//
//  var map = {
//    "sku" : "Envelope.Request.Item.SKU"
//    , "upc" : "Envelope.Request.Item.UPC"
//    , "title" : "Envelope.Request.Item.ShortTitle"
//    , "length" : "Envelope.Request.Item.Dimensions.Length"
//    , "width" : "Envelope.Request.Item.Dimensions.Width"
//    , "height" : "Envelope.Request.Item.Dimensions.Height"
//    , "weight" : [["Envelope.Request.Item.Weight", null, function () { return undefined; } ]]
//    , "weightUnits" : [["Envelope.Request.Item.WeightUnits", null, function () { return null; } ]]
//    , "inventory.onHandQty" : "Envelope.Request.Item.Inventory"
//    , "inventory.replenishQty" : "Envelope.Request.Item.RelpenishQuantity"
//    , "inventory.isInventoryItem" : { key : [ "Envelope.Request.Item.OnInventory", null, "YES" ] }
//    , "price" : ["Envelope.Request.Item.Price[].List", "Envelope.Request.Item.Price[].Value", "Test[]"]
//    , "descriptions[0]": "Envelope.Request.Item.ShortDescription"
//    , "descriptions[1]": "Envelope.Request.Item.LongDescription"
//  };
//
//  var expected = {
//    Test : [100],
//    Envelope: {
//      Request: {
//      Item: {
//        SKU: "12345",
//        UPC: "99999912345X",
//        ShortTitle: "Test Item",
//        Dimensions: {
//          Length: 5,
//          Width: 2,
//          Height: 8
//        },
//        WeightUnits : null,
//        Inventory: 0,
//        RelpenishQuantity: null,
//        OnInventory : 'YES',
//        Price : [{
//          List : 100,
//          Value : 100
//        }],
//        ShortDescription : "Short description",
//        LongDescription : "Long description"
//      }
//      }
//    }
//  };
//
//  var result = merge(obj, {}, map);
//
//  t.deepEqual(expected, result);
//
//  map.sku = {
//    key : "Envelope.Request.Item.SKU"
//    , transform : function (val, objFrom, objTo) {
//        return "over-ridden-sku";
//    }
//  }
//
//  expected.Envelope.Request.Item.SKU = "over-ridden-sku";
//
//  result = merge(obj, {}, map);
//  t.deepEqual(expected, result, 'transform');
//
//
//  obj["inventory"] = null;
//  expected.Envelope.Request.Item.Inventory = null;
//
//  result = merge(obj, {}, map);
//  t.deepEqual(expected, result, 'transform');
//
//  t.end();
//});
//
