import React from 'react';
import PropTypes from 'prop-types';
import CFOCPageCommitteeWorkGroupComponent from './cfoc_page_committee_workgroup';
import CFOCPageAttachmentsComponent from './cfoc_page_attachments';

function CFOCPageCommitteeDetailComponent(props) {
  const {
    title, body, attachments, workingGroupsActive, workingGroupsInactive,
  } = props;

  return (
    <div className="cfoc-committee-detail">
      {
        !title
          ? null
          : (
            <h1>{title}</h1>
          )
      }
      {
        !body
          ? null
          : (
            <article dangerouslySetInnerHTML={{ __html: body }} />
          )
      }

      { attachments.length ? <CFOCPageAttachmentsComponent attachments={attachments} /> : null }
      { workingGroupsActive.length ? <h3>Working Groups</h3> : null }
      {
        !workingGroupsActive.length
          ? null
          : (
            workingGroupsActive.map((group, index) => {
              const key = index + 1;
              return (
                <CFOCPageCommitteeWorkGroupComponent
                  title={group.item_title}
                  body={group.item_body}
                  attachments={group.item_attachments}
                  key={key}
                />
              );
            })
          )
      }
      { workingGroupsInactive.length ? <h3>Inactive Working Groups</h3> : null }
      {
        !workingGroupsInactive.length
          ? null
          : (
            workingGroupsInactive.map((group, index) => {
              const key = index + 1;
              return (
                <CFOCPageCommitteeWorkGroupComponent
                  title={group.item_title}
                  body={group.item_body}
                  attachments={group.item_attachments}
                  key={key}
                />
              );
            })
          )
      }
    </div>
  );
}

CFOCPageCommitteeDetailComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  attachments: PropTypes.array,
  attachment: PropTypes.shape({
    attachment_title: PropTypes.string,
    attachment_file: PropTypes.string,
  }),
  workingGroupsActive: PropTypes.array,
  workingGroupsInactive: PropTypes.array,
  group: PropTypes.shape({
    item_title: PropTypes.string,
    item_body: PropTypes.string,
    item_attachments: PropTypes.any,
  }),
};

CFOCPageCommitteeDetailComponent.defaultProps = {
  title: '',
  body: '',
  attachments: [],
  attachment: {},
  workingGroupsActive: [],
  workingGroupsInactive: [],
  group: {},
};

export default CFOCPageCommitteeDetailComponent;
