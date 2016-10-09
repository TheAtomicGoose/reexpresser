var expl = ['data_x'];
var resp = ['data'];

$(document).ready(function() {

    $('#addRow').click(function() {
        $('tbody tr:first').clone().appendTo('tbody');
    });

    $('#removeRow').click(function() {
        $('tbody tr:last').remove();
    });

    $('input:text').change(function() {
        var allFilled = true;
        var allNumbers = true;
        $('input:text').each(function() {
            // If the cell is empty or the value of the cell is NaN
            if ($(this).val().length < 1) {
                allFilled = false;
            } else if (isNaN(parseFloat($(this).val()))) {
                allNumbers = false;
            }
        });

        if (!allFilled || !allNumbers) {
            return false;
        } else {
            chartAll();
        }
    });
});

function retrieveVals() {
    var counter = 0;
    $('input:text').each(function() {
        if (counter % 2 === 0) {
            expl.push(parseFloat($(this).val()));
        } else {
            resp.push(parseFloat($(this).val()));
        }
        counter++;
    });
}

function chartAll() {
    retrieveVals();
    chart('#original', expl, resp);
    chart('#sqr', expl, transform(resp, square));
    chart('#sqrt', expl, transform(resp, squareRoot));
    chart('#logy', expl, transform(resp, log10));
    chart('#neg-inv-sqrt', expl, transform(resp, negativeInverseRoot));
    chart('#neg-inv', expl, transform(resp, negativeInverse));
    chart('#neg-inv-sqr', expl, transform(resp, negativeInverseSquare));
    chart('#logx', transform(expl, log10), resp);
    chart('#logxy', transform(expl, log10), transform(resp, log10));
}

function chart(div, data_x, data_y) {
    var chart = c3.generate({
        bindto: div,
        data: {
            xs: {
                data: 'data_x'
            },

            columns: [
                data_x,
                data_y
            ],
            type: 'scatter'
        }
    });
}

function transform(data, transformer) {
    // Starts at 1 to preserve label
    var transformed = [data[0]];
    for (var i = 1; i < data.length; i++) {
        transformed[i] = transformer(data[i]);
    }
    return transformed;
}

function square(val) {
    return Math.pow(val, 2);
}

function squareRoot(val) {
    return Math.sqrt(val);
}

function log10(val) {
    return Math.log10(val);
}

function negativeInverseRoot(val) {
    return -1 / Math.sqrt(val);
}

function negativeInverse(val) {
    return -1 / val;
}

function negativeInverseSquare(val) {
    return -1 / (Math.pow(val, 2));
}
