import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CountryList from './CountryList';
import RootModal from './RootModal';

const countryListRenderer = (params) => {
  if (params.dropdownContainer) {
    return (
      <RootModal>
        <CountryList { ...params } />
      </RootModal>
    );
  }

  return (
    <CountryList { ...params } />
  );
};

class FlagDropDown extends Component {
  genSelectedDialCode = () =>
    this.props.separateDialCode && (
      <div className="selected-dial-code">{this.props.dialCode}</div>
    );

  genArrow = () => {
    const arrowClass = classNames('iti-arrow', {
      up: this.props.showDropdown,
    });

    return this.props.allowDropdown && <div className={ arrowClass } />;
  };

  render() {
    const {
      setFlag,
      isMobile,
      inputTop,
      countries,
      countryCode,
      showDropdown,
      inputOuterHeight,
      dropdownContainer,
      preferredCountries,
      highlightedCountry,
      changeHighlightCountry,
    } = this.props;

    const flagClassObj = {
      'iti-flag': true,
    };

    if (countryCode) {
      flagClassObj[countryCode] = true;
    }

    const flagClass = classNames(flagClassObj);

    const countryListProps = {
      setFlag,
      inputTop,
      isMobile,
      countries,
      showDropdown,
      inputOuterHeight,
      dropdownContainer,
      preferredCountries,
      highlightedCountry,
      changeHighlightCountry,
      className: !showDropdown && 'hide',
      ref: (countryList) => { this.countryList = countryList; },
    };

    return (
      <div
        ref={ this.props.refCallback }
        className="flag-container"
      >
        <div
          onKeyDown={ this.props.handleSelectedFlagKeydown }
          tabIndex={ this.props.allowDropdown ? '0' : '' }
          onClick={ this.props.clickSelectedFlag }
          title={ this.props.titleTip }
          className="selected-flag"
        >
          <div className={ flagClass } />
          { this.genSelectedDialCode() }
          { this.genArrow() }
        </div>
        {this.props.countryListRenderer(countryListProps)}
      </div>
    );
  }
}

FlagDropDown.propTypes = {
  countryListRenderer: PropTypes.func,
  allowDropdown: PropTypes.bool,
  dropdownContainer: PropTypes.string,
  separateDialCode: PropTypes.bool,
  dialCode: PropTypes.string,
  countryCode: PropTypes.string,
  showDropdown: PropTypes.bool,
  clickSelectedFlag: PropTypes.func,
  handleSelectedFlagKeydown: PropTypes.func,
  isMobile: PropTypes.bool,
  setFlag: PropTypes.func,
  countries: PropTypes.arrayOf(PropTypes.object),
  inputTop: PropTypes.number,
  inputOuterHeight: PropTypes.number,
  preferredCountries: PropTypes.arrayOf(PropTypes.object),
  highlightedCountry: PropTypes.number,
  changeHighlightCountry: PropTypes.func,
  titleTip: PropTypes.string,
  refCallback: PropTypes.func.isRequired,
};

FlagDropDown.defaultProps = {
  countryListRenderer,
};

export default FlagDropDown;
