/**
 * Created by Admin on 30/10/2017.
 */
Qualtrics.SurveyEngine.addOnload(function () {

    var that = this;

    function hideEl(element) {
        if ($(element)) $(element).hide();
    }

    //hideEl.defer('NextButton');

    this.disableNextButton();

    jq('.ChoiceRow:last').find('td').hide();
    jq('.ChoiceRow:nth-last-child(2)')
        .css('background-color', 'yellow')
        .find('input:radio').prop('disabled', true).end()
        .find('td:last').hide();

    this.questionclick = function (event, element) {
        // -2 to neglect standard rating and comments
        var totalQs = this.getChoices().length - 2;
        var selectedAnswers = this.getSelectedAnswers();
        var answeredQs = 0;
        var countNA = 0;

        for (var i in selectedAnswers) {
            if (i == 5) {
                totalQs -= selectedAnswers[i];
                countNA = selectedAnswers[i];
                continue;
            }
            answeredQs += selectedAnswers[i];
        }

        if (answeredQs == totalQs) {

            var totalMarks = totalQs * 300;
            var marksObtained = 0;
            var percent = 0;
            var finalCheckedColumn = -6; // -6 so that no column can be checked

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

            if (percent > 83.33) {
                finalCheckedColumn = 0;
            } else if (percent > 50) {
                finalCheckedColumn = 1;
            } else if (percent > 16.67) {
                finalCheckedColumn = 2;
            } else if (percent >= 0 && totalQs != 0) {
                finalCheckedColumn = 3;
            }

            // omit this section from calculation
            if(countNA == totalQs) {
                percent = -1;
            }

            jq('.ChoiceRow:nth-last-child(2) td:eq(' + finalCheckedColumn + ')')
                .find('input').prop('checked', true).end()
                .find('label').addClass('q-checked');

            that.enableNextButton();

            Qualtrics.SurveyEngine.setEmbeddedData('stage1', percent);
        }
    };

});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});