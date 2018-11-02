import * as assert from 'assert';
import ExtensionUtil from '../extensionUtil';


suite("Extension Tests", function () {

    test("testParseCommand", function() {
        let result = ExtensionUtil.parseCommand('openfile.xml','test.jar','args');
        assert.equal('test.jar args', result);

        result = ExtensionUtil.parseCommand('openfile.xml','test.jar','$currentFile args');
        assert.equal('test.jar openfile.xml args', result);
    });

});