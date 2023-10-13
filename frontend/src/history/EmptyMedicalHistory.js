import React from "react";
import {FormattedMessage} from "react-intl";

export default function EmptyMedicalHistory() {
    return  <div>
                <h4><FormattedMessage id="empty-history.history" defaultMessage="Medical history" /></h4>
                <hr />
                <p><b><FormattedMessage id="empty-history.no-entries" defaultMessage="There are no notes yet" />.</b></p>
                <p><FormattedMessage id="empty-history.add-notes" defaultMessage="Add notes" /></p>
            </div>
}