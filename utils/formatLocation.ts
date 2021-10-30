const formatLocation = (lng, lat) => (!lat || !lng ? "-" : `${lng}, ${lat}`);

export default formatLocation;
