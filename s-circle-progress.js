/**
`s-circle-progress`
Polymer-based web component displaying a circular progress bar.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-resizable-behavior/iron-resizable-behavior.js';
import '@polymer/paper-styles/default-theme.js';

Polymer({
  _template: Polymer.html`
<style>

:host {
  @apply(--layout-vertical);
  @apply(--layout-center-center);

  position: relative;

  width: 64px;
  height: 64px;
  margin: 24px;

  border-radius: 50%;
}

svg {
  position: absolute;
  top: 0;
  left: 0;

  display: none;
}

.Circle-background {
  stroke: var(--s-circle-progress-bg-stroke-color, --paper-grey-100);
}

.Circle-foreground {
  transition: var(--s-circle-progress-transition, stroke-dashoffset 150ms);
  stroke: var(--s-circle-progress-stroke-color, --accent-color);
  stroke-linecap: var(--s-circle-progress-stroke-linecap, round);
}

</style>

<svg id="circle" width="100%" height="100%">
  <circle class="Circle-background" r\$="[[_radius]]" cx\$="[[_cx]]" cy\$="[[_cy]]" fill="transparent" stroke-width\$="[[strokeWidth]]"></circle>
  <circle class="Circle-foreground" r\$="[[_radius]]" cx\$="[[_cx]]" cy\$="[[_cy]]" fill="transparent" stroke-width\$="[[strokeWidth]]" stroke-dasharray\$="[[_dasharray]]" stroke-dashoffset\$="[[_dashoffset]]" transform\$="[[_transform]]"></circle>
</svg>

<content></content>
`,

  is: 's-circle-progress',

  behaviors: [
    Polymer.IronResizableBehavior
  ],

  properties: {
    /**
     * Value of circular progress bar.
     */
    value: {
      type: Number,
      value: 0
    },

    /**
     * Maximum of value.
     */
    max: {
      type: Number,
      value: 100
    },

    /**
     * Stroke width of circle.
     */
    strokeWidth: {
      type: Number,
      value: 4
    },

    /**
     * Starting angle of the progress.
     */
    angle: {
      type: Number,
      value: -90
    },

    _cx: {
      type: Number,
      value: null
    },

    _cy: {
      type: Number,
      value: null
    },

    _radius: {
      type: Number,
      computed: '_computeRadius(_cx, _cy, strokeWidth)'
    },

    _transform: {
      type: String,
      computed: '_computeTransform(angle, _cx, _cy)'
    },

    _dasharray: {
      type: Number,
      computed: '_computeDashArray(_radius)'
    },

    _dashoffset: {
      type: Number,
      computed: '_computeDashOffset(value, max, _dasharray)'
    }
  },

  listeners: {
    "iron-resize": "_onIronResize"
  },

  _computeDashArray: function(radius) {
    return 2 * Math.PI * radius;
  },

  _computeDashOffset: function(value, max, dasharray) {
    return (1 - value / max) * dasharray;
  },

  _computeRadius: function(cx, cy, strokeWidth) {
    return cx && cy ? Math.max(0, Math.min(cx, cy) - strokeWidth / 2) : 0;
  },

  _computeTransform: function(angle, cx, cy) {
    return cx && cy ? 'rotate(' + angle + ', ' + cx + ', ' + cy + ')' : '';
  },

  _onIronResize: function() {
    if (this.offsetWidth && this.offsetHeight) {
      this._cx = this.offsetWidth / 2;
      this._cy = this.offsetHeight / 2;
      this.$.circle.style.display = 'block';
    }
  }
});
