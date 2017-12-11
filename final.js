Qualtrics.SurveyEngine.addOnload(function () {

});

Qualtrics.SurveyEngine.addOnReady(function () {
    var that = this;

    function hideEl(element) {
        if ($(element)) $(element).hide();
    }

    //hideEl.defer('NextButton');

    this.disableNextButton();

    jq('.ChoiceRow')
        .find('input:radio').prop('disabled', true).end();

    var stage1 = "${e://Field/stage1}";
    var stage2 = "${e://Field/stage2}";
    var stage3 = "${e://Field/stage3}";
    var stage4 = "${e://Field/stage4}";
    var stage5 = "${e://Field/stage5}";
    var stage6 = "${e://Field/stage6}";
    var stage7 = "${e://Field/stage7}";
    //var grandTotal = stage1+stage2+stage3+stage4+stage5+stage6+stage7 / 700 * 100;

    var getColumnToCheck = function (percent) {
        var finalCheckedColumn = -6;
        if (percent > 83.33) {
            finalCheckedColumn = 0;
        } else if (percent > 50) {
            finalCheckedColumn = 1;
        } else if (percent > 16.67) {
            finalCheckedColumn = 2;
        } else if (percent >= 0) {
            finalCheckedColumn = 3;
        }
        return finalCheckedColumn;
    };

    var stage1Col = getColumnToCheck(stage1);
    var stage2Col = getColumnToCheck(stage2);
    var stage3Col = getColumnToCheck(stage3);
    var stage4Col = getColumnToCheck(stage4);
    var stage5Col = getColumnToCheck(stage5);
    var stage6Col = getColumnToCheck(stage6);
    var stage7Col = getColumnToCheck(stage7);

    console.log(stage1 + "." + stage2 + "." + stage3 + "." + stage4 + "." + stage5 + "." + stage6 + "." + stage7);
    console.log(stage1Col + "." + stage2Col + "." + stage3Col + "." + stage4Col + "." + stage5Col + "." + stage6Col + "." + stage7Col);

    jq('.ChoiceRow:eq(0) td:eq(' + stage1Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('.ChoiceRow:eq(1) td:eq(' + stage2Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('.ChoiceRow:eq(2) td:eq(' + stage3Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('.ChoiceRow:eq(3) td:eq(' + stage4Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('.ChoiceRow:eq(4) td:eq(' + stage5Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('.ChoiceRow:eq(5) td:eq(' + stage6Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('.ChoiceRow:eq(6) td:eq(' + stage7Col + ')')
        .find('input').prop('checked', true).end()
        .find('label').addClass('q-checked');

    jq('<tr style="background-color:#28ABE2; color:white;"><td style="text-align:left; padding:5px;">PART I. STANDARDS</td><td style= padding:5px;">HE</td><td style= padding:5px;>E</td><td style= padding:5px;>D</td><td style= padding:5px;>I</td></tr>').insertBefore('.ChoiceRow:eq(0)')
    jq('<tr style="background-color:#28ABE2; color:white;"><td style="text-align:left; padding:5px;">PART II. VALUES</td><td style= padding:5px;">HE</td><td style= padding:5px;>E</td><td style= padding:5px;>D</td><td style= padding:5px;>I</td></tr>').insertBefore('.ChoiceRow:eq(5)')
    jq('<tr style="background-color:#28ABE2; color:white;"><td style="text-align:left; padding:5px;">Part III. ANNUAL SUPERINTENDENT OBJECTIVES</td><td style= padding:5px;">HE</td><td style= padding:5px;>E</td><td style= padding:5px;>D</td><td style= padding:5px;>I</td></tr>').insertBefore('.ChoiceRow:eq(6)');


    that.enableNextButton();


});

Qualtrics.SurveyEngine.addOnUnload(function () {

});