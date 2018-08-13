import React from 'react';

export const GridView = ({ className, children, items, RowComponent, loading, ...props }) => {
  let childrenLists = [];
  if (Array.isArray(children)) {
    childrenLists = children;
  } else {
    childrenLists = [children];
  }
  childrenLists =  childrenLists.length > 1 ? childrenLists.reduce((p,c)=> { p = p.concat(c); return p },[] ) : childrenLists;
 
  const columns = childrenLists.reduce((prev,child) => {
    child && prev.push({
    key: child.props.propKey,
    label: child.props.label,
    badge: child.props.badge,
    textAlign: child.props.textAlign
  })
  return prev;
},[]);
  return (
    <div>
      {!loading && (
        <table className={`table ${className}`}>
          <thead>
            <tr>{columns.map((column, idx) => <th key={idx}>{column.label}</th>)}</tr>
          </thead>
          <tbody>
            {items.map((item, idx) => <RowComponent key={idx} rowData={item} {...props} columns={columns} />)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export const GridViewColumn = ({ propKey, label }) => {
  return null;
};

export default Object.assign(GridView, {
  GridViewColumn
});
