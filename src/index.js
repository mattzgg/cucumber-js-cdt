const _ = require('lodash');
const { default: DataTable } = require('cucumber/lib/models/data_table');

module.exports = function(examples) {
    if (examples.length === 0) {
        return new DataTable({
            rows: [],
        });
    }

    const headerCells = _.map(_.keys(examples[0]), key => ({ value: key }));
    const headerRow = { cells: headerCells };
    const gherkinData = _.reduce(
        examples,
        (result, example) => {
            const row = _.reduce(
                headerCells,
                (pendingRow, { value: key }) => {
                    const cell = {
                        value: example[key],
                    };
                    pendingRow.cells = _.concat(pendingRow.cells, cell);
                    return pendingRow;
                },
                { cells: [] },
            );
            result.rows = _.concat(result.rows, row);
            return result;
        },
        { rows: [headerRow] },
    );
    return new DataTable(gherkinData);
};
