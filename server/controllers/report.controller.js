import HttpStatus from 'http-status-codes';
import Report from '../models/report.model';

/**
 * Find all the reports
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findAll(req, res) {
    new Report({ user_id: req.currentUser.id })
        .fetchAll()
        .then(report => res.json({
            error: false,
            data: report.toJSON()
        }))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        }));
}

/**
 *  Find report by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function findById(req, res) {
    new Report({ id: req.params.id, user_id: req.currentUser.id })
        .fetch()
        .then(report => {
            if (!report) {
                res.status(HttpStatus.NOT_FOUND).json({
                    error: true, data: {}
                });
            }
            else {
                res.json({
                    error: false,
                    data: report.toJSON()
                });
            }
        })
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        }));
}

/**
 * Store new report
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function store(req, res) {
    const item = req.body;
    new Report({ ...item, user_id: req.currentUser.id })
        .save()
        .then(() => res.json({
            success: true,
            data: { message: 'Report added successfully.' }
        }))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: err
        }));
}

/**
 * Update report by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function update(req, res) {
    const item = req.body;
    new Report({ id: req.params.id, user_id: req.currentUser.get('id') })
        .fetch({ require: true })
        .then(report => report.save({
            ...item,
        }))
        .then(() => res.json({
            error: false,
            data: { message: 'Report updated successfully.' }
        }))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: { message: err.message }
        }));
}

/**
 * Destroy report by id
 *
 * @param {object} req
 * @param {object} res
 * @returns {*}
 */
export function destroy(req, res) {
    new Report({ id: req.params.id, user_id: req.currentUser.id })
        .fetch({ require: true })
        .then(report => report.destroy())
        .then(() => res.json({
            error: false,
            data: { message: 'Report deleted successfully.' }
        }))
        .catch(err => res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            data: { message: err.message }
        }));
}