import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { downIcon, upIcon } from './images';
import getStyle from './styles';


class CollapsibleView extends PureComponent {
  constructor(props) {
    super(props);
    styles = getStyle();

    this.state = {
      expanded: this.props.initialOpen,
      animation: new Animated.Value(this.props.initialOpen ? this.props.max : this.props.min),
      max: this.props.max,
      min: this.props.min,
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    const initialValue = this.state.expanded ? this.state.max + this.state.min : this.state.min;
    const finalValue = this.state.expanded ? this.state.min : this.state.max + this.state.min;

    this.setState(prevState => ({ expanded: !prevState.expanded }));

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation,
      {
        toValue: finalValue,
      }).start();
  }

  renderHeader() {
    const {
      title,
      isDefaultHeader,
      titleTextExpandedColor,
      titleTextClosedColor,
      defaultHeaderStyle,
      useStyledArrows,
      titleStyle,
    } = this.props;
    const { expanded } = this.state;
    if (isDefaultHeader) {
      return (
        <TouchableOpacity style={defaultHeaderStyle || styles.containerStyle} onPress={() => this.toggle()}>
          <Text numberOfLines={5} color={expanded ? `${titleTextExpandedColor}` : `${titleTextClosedColor}`} size={20} weight="BOLD" style={titleStyle || styles.defaultTitleStyle}>{title}</Text>
          <View style={styles.toggleStyle}>
            {
            useStyledArrows
              ? (
                <View style={styles.arrowStyle}>
                  <Image style={styles.imageStyle} source={expanded ? upIcon : downIcon} />
                </View>
              )
              : (
                <Image style={styles.imageStyle} source={expanded ? upIcon : downIcon} />
              )
          }
          </View>
        </TouchableOpacity>
      );
    }
    return this.props.header;
  }

  renderBody(color) {
    return (
      <Animated.View
        style={[this.props.container ? this.props.container : styles.container, { backgroundColor: color }, this.props.direction === 'vertical' ? { maxHeight: this.state.animation } : { maxWidth: this.state.animation }, this.state.expanded ? this.props.borderStyle : { borderWidth: 0 }]}
      >
        {this.renderHeader()}
        <View>
          {this.state.expanded
            ? this.props.children
            : null }
        </View>
      </Animated.View>
    );
  }

  render() {
    const {
      expandedColor, closedColor,
    } = this.props;

    return this.renderBody(this.state.expanded ? expandedColor : closedColor);
  }
}

CollapsibleView.propTypes = {
  container: PropTypes.any,
  borderStyle: PropTypes.any,
  titleStyle: PropTypes.any,
  max: PropTypes.number,
  min: PropTypes.number,
  title: PropTypes.string,
  useStyledArrows: PropTypes.bool,
  direction: PropTypes.string,
  titleTextExpandedColor: PropTypes.string,
  titleTextClosedColor: PropTypes.string,
  expandedColor: PropTypes.string,
  closedColor: PropTypes.string,
  initialOpen: PropTypes.bool,
  isDefaultHeader: PropTypes.bool,
  children: PropTypes.any,
  header: PropTypes.any,
  defaultHeaderStyle: PropTypes.any,
};
CollapsibleView.defaultProps = {
  container: [],
  borderStyle: [],
  titleStyle: null,
  max: 110,
  min: 40,
  title: 'Title',
  useStyledArrows: false,
  direction: 'vertical',
  titleTextExpandedColor: '#709CE2',
  titleTextClosedColor: '#709CE2',
  expandedColor: '#E6E9FC',
  closedColor: 'transparent',
  initialOpen: false,
  isDefaultHeader: false,
  children: null,
  header: null,
  defaultHeaderStyle: null,
};

export default CollapsibleView;
