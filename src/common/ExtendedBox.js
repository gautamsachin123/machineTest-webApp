import React from 'react';
import classnames from 'classnames';

export class BoxTitle extends React.Component {
  render() {
    const { children, expandOnTitleClick, onTitleClick, className } = this.props;
    return (
      <h3
        // onClick={() => expandOnTitleClick && onTitleClick()}
        className={classnames('box-title', { pointer: expandOnTitleClick }, className)}
      >
        {children}
      </h3>
    );
  }
}

export class BoxTools extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export class BoxHeader extends React.Component {
  render() {
    const { isCollapsible, withBorder, collapsed, className, children, onCollapse, expandOnTitleClick } = this.props;
    const myChildren = Array.isArray(children) ? children : [children];
    const Title = myChildren.find(child => child.type === BoxTitle);
    const Tools = myChildren.find(child => child.type === BoxTools);
    const renderTools = () => {
      if (isCollapsible || Tools) {
        return (
          <div className="box-tools pull-right">
            {Tools ? React.cloneElement(Tools) : null }
            {isCollapsible && (
              <button onClick={onCollapse} type="button" className="btn btn-box-tool" data-widget="collapse">
                <i className={classnames('fa', { 'fa-plus': collapsed }, { 'fa-minus': !collapsed })} />
              </button>
            )}
          </div>
        );
      }
      return null;
    };

    return (
      <div className={classnames('box-header', { 'with-border': withBorder }, className)}>
        {Title ? (
          React.cloneElement(Title, { expandOnTitleClick: expandOnTitleClick, onTitleClick: onCollapse })
        ) : (
          null
        )}
        {renderTools()}
      </div>
    );
  }
}

export const BoxBody = ({ children, noPadding, className }) => (
  <div className={classnames('box-body', className, { 'no-padding': noPadding })}>{children}</div>
);

BoxBody.defaultProps = {
  noPadding: false
};

export const BoxFooter = ({ children, className }) => {
  return <div className={classnames('box-footer', className)}>{children}</div>;
};

export default class Box extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {
    this.setState({
      collapsed: this.props.collapsed
    });
  }

  collapse() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const {
      altStyle,
      children,
      className,
      expandOnTitleClick,
      isCollapsible,
      isLoading,
      isSolid,
      noTopBorder,
      style
    } = this.props;
    const myChildren = Array.isArray(children) ? children : [children];
    const Header = myChildren.find(child => child.type === BoxHeader);
    const Body = myChildren.find(child => child.type === BoxBody);
    const Footer = myChildren.find(child => child.type === BoxFooter);
    return (
      <div
        style={style || {}}
        className={classnames(
          'box',
          { [`box-${altStyle}`]: Boolean(altStyle) },
          { ['box-solid']: Boolean(isSolid) },
          { 'collapsed-box': this.state.collapsed },
          { 'no-top-border': noTopBorder },
          className
        )}
      >
        {Header ? (
          React.cloneElement(Header, {
            isCollapsible,
            collapsed: this.state.collapsed,
            onCollapse: this.collapse.bind(this),
            expandOnTitleClick: expandOnTitleClick
          })
        ) : (
          null
        )}
        {Body ? React.cloneElement(Body, { isCollapsible }) : null}
        {Footer ? React.cloneElement(Footer, { isCollapsible }) : null}
        {isLoading && (
          <div className="overlay">
            <i className="fa fa-refresh fa-spin" />
          </div>
        )}
      </div>
    );
  }
}

Box.defaultProps = {
  altStyle: 'default',
  collapsed: false,
  expandOnTitleClick: true,
  isCollapsible: false,
  isLoading: false,
  isSolid: false,
  noTopBorder: false
};
