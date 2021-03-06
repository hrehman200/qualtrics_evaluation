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
    //this.disableNextButton();

    jq('textarea').on('keyup', function (e) {
        Qualtrics.SurveyEngine.setEmbeddedData('stage1Comment', jq('textarea').val());
    });

    var setColumnToCheck = function(percent) {
        var finalCheckedColumn = -6; // -6 so that no column can be checked
        if (percent >= 83.33) {
            finalCheckedColumn = 0;
        } else if (percent >= 50) {
            finalCheckedColumn = 1;
        } else if (percent >= 16.67) {
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

        // this event called twice, once for label, once of input
        if(!jq(element).is('input')) {
            return;
        }

        // -2 to neglect standard rating and comments
        var totalQs = this.getChoices().length - 2;
        var selectedAnswers = this.getSelectedAnswers();
        var answeredQs = 0;

        for (var i in selectedAnswers) {
            if (i == 5) {
                totalQs -= selectedAnswers[i];
                continue;
            }
            answeredQs += selectedAnswers[i];
        }

        if (answeredQs >= totalQs) {

            var totalMarks = totalQs * 300;
            var marksObtained = 0;
            var percent = 0;

            // which column in standard rating is checked
            var checkedId = jq('.ChoiceRow:nth-last-child(2)').find('input:checked').attr('id');
            if(checkedId != undefined) {
                var arr = checkedId.split('~');
                var column = arr[arr.length - 1];
                if (column != undefined) {
                    selectedAnswers[column] -= 1;
                }
            }

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
            console.log(selectedAnswers);
            console.log(totalQs);
            console.log(marksObtained);
            console.log(percent + "%");

            jq('.ChoiceRow:nth-last-child(2)')
                .find('input').prop('checked', false).end()
                .find('label').removeClass('q-checked').end();

            setColumnToCheck(percent);

            // omit this section from calculation
            if(totalQs == 0) {
                percent = -1;
            }

            //that.enableNextButton();

            Qualtrics.SurveyEngine.setEmbeddedData('stage1', percent);
        }
    };

});

Qualtrics.SurveyEngine.addOnUnload(function () {
});