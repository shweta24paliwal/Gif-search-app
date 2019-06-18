import React from "react";
import styles from "./noResults.module.css";

const NoResults = ({ totalCount }) => {
  if (totalCount === 0) {
    return (
      <div className={styles.noResultsFound}>
        <i className="fas fa-exclamation-triangle" /> No Results Found. Try
        Another Query.
      </div>
    );
  }
  return null;
};

export default NoResults;
