/**
 * Created by Admin on 30/10/2017.
 */
Qualtrics.SurveyEngine.addOnload(function () {
});

Qualtrics.SurveyEngine.addOnReady(function () {
    var that = this;

    function hideEl(element) {
        if ($(element)) $(element).hide();
    }

    //hideEl.defer('NextButton');

    this.disableNextButton();

    var setColumnToCheck = function(percent) {
        var finalCheckedColumn = -6; // -6 so that no column can be checked
        if (percent > 83.33) {
            finalCheckedColumn = 0;
        } else if (percent > 50) {
            finalCheckedColumn = 1;
        } else if (percent > 16.67) {
            finalCheckedColumn = 2;
        } else if (percent >= 0) {
            finalCheckedColumn = 3;
        }

        jq('.ChoiceRow:nth-last-child(2) td:eq(' + finalCheckedColumn + ')')
            .find('input').prop('checked', true).end()
            .find('label').addClass('q-checked');
    };

    jq('.ChoiceRow:last').find('td').hide();
    jq('.ChoiceRow:nth-last-child(2)')
        .css('background-color', 'yellow')
        .find('input:radio').prop('disabled', true).end()
        .find('td:last').hide();

    var stage1Percent = "${e://Field/stage1}";
    if(stage1Percent != ''){
        setColumnToCheck(stage1Percent);
    }

    this.questionclick = function (event, element) {
        // -2 to neglect standard rating and comments
        var totalQs = this.getChoices().length - 2;
        var selectedAnswers = this.getSelectedAnswers();
        var answeredQs = 0;
        var countNA = 0;

        console.log(selectedAnswers);

        for (var i in selectedAnswers) {
            if (i == 5) {
                totalQs -= selectedAnswers[i];
                countNA = selectedAnswers[i];
                continue;
            }
            answeredQs += selectedAnswers[i];
        }

        if (answeredQs >= totalQs) {

            var totalMarks = totalQs * 300;
            var marksObtained = 0;
            var percent = 0;

            for (var i in selectedAnswers) {
                if (i == 5) {
                    continue;
                }
                var recodeValue = that.getChoiceRecodeValue(i);
                marksObtained += selectedAnswers[i] * recodeValue;
            }

            percent = marksObtained / totalMarks * 100;
            percent = percent.toFixed(2);
            if(isNaN(percent)) {
                percent = 0;
            }
            console.log(percent + "%");

            jq('.ChoiceRow:nth-last-child(2)')
                .find('input').prop('checked', false).end()
                .find('label').removeClass('q-checked').end();

            setColumnToCheck(percent);

            // omit this section from calculation
            if(totalQs == 0) {
                percent = -1;
            }

            that.enableNextButton();

            Qualtrics.SurveyEngine.setEmbeddedData('stage1', percent);
        }
    };

});

Qualtrics.SurveyEngine.addOnUnload(function () {
});