export const createHTMLMapMarker = ({
  OverlayView = google.maps.OverlayView,
  ...args
}) => {
  class HTMLMapMarker extends OverlayView {
    public div: any;
    public component: any;
    public merkerData: any;
    public lng: any;
    public lat: any;
    public position: any;
    public scheduleCmp: any;
    public bounds: any;
    public markerData: any;
    public x: any;
    public y:any;
    constructor() {
      super();
      this.bounds = (args as any).bounds;
      this.position =  (args as any).latlng;
      this.markerData =  (args as any).data;
      this.x =  (args as any).x;
      this.y =  (args as any).y;
      this.component = null;
      this.scheduleCmp = null;
    }
    /**
     * Create div for marker
     */
    createDiv() {
      this.div = document.createElement('div'); // create div
      this.div.className = "map-marker";
      this.div.style.position = 'absolute';
      this.div.style.cursor = 'pointer';
      this.div.style.transform = 'translate(-50%,-100%)';
      this.div.style['zIndex'] = google.maps.Marker.MAX_ZINDEX + 1;
      // Marker Component
      this.div.style.width = '50px';
      this.div.style.height = '60px';

      this.markerComponent();
      this.div.appendChild(this.component);

      const panes = this.getPanes() as any; // return MapPanes;
      panes.overlayImage.style['zIndex'] = google.maps.Marker.MAX_ZINDEX + 1;
      panes.overlayImage.appendChild(this.div);
      // Trigger register
      google.maps.event.addDomListener(this.div, "click", (event: any) => {
        google.maps.event.trigger(this, "click");
      });
      google.maps.event.addDomListener(this.div, "mouseover", (event: any) => {
        google.maps.event.trigger(this, "mouseover");
      });
    }
    markerComponent() {
      this.component = document.createElement('app-map-marker');
      // Component input property
      this.component.merkerData = this.merkerData;
      this.component.markerData = {
        lat: this.lat,
        lng: this.lng
      }
    }

    setClustor(obj: any) {
      if (this.component) {
        this.component.markerClusterer = obj.isClusterer;
        this.component.icon = obj.icon;
        this.component.label = obj.label;
      }
    }
    // Set Div position
    positionDiv() {
      const overlayProjection = this.getProjection();
      if(overlayProjection) {
        const point = overlayProjection.fromLatLngToDivPixel(this.position) as any;
        if (this.div) {
          this.div.style.left = point.x + "px";
          this.div.style.top = point.y + "px";
        }
      }
    }
    // Drawing
    override draw() {
      if (!this.div) {
        this.createDiv();
      }
      this.positionDiv();
    }
    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
      }
    }
    getPosition() {
      return this.position;
    }
    getDraggable() {
      return false;
    }
    hide() {
      if (this.div) {
        this.div.style.visibility = "hidden";
      }
    }
    show() {
      if (this.div) {
        this.div.style.visibility = "visible";
      }
    }
    toggle() {
      if (this.div) {
        if (this.div.style.visibility === "hidden") {
          this.show();
        } else {
          this.hide();
        }
      }
    }
    toggleDOM(map: any) {
      if (this.getMap()) {
        this.setMap(null);
      } else {
        this.setMap(map);
      }
    }
    // Getting
    getVisible() {
      return true;
    }
    getZIndex() {
      return 9999;
    }

    // Setting
    setPosition(position: any) {
      this.position = position;
      this.positionDiv();
    }
    setZIndex(zindex: any) {
      if (this.div) {
        (this.getPanes() as any).overlayImage.style['zIndex'] = zindex;
        this.div.style['zIndex'] = zindex;
      }
    }
    setIcon(iconUrl: any) {
      if (this.scheduleCmp) {
        this.scheduleCmp.icon = iconUrl;
      }
    }
  }
  return new HTMLMapMarker();
}
