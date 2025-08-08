
import React, { memo } from 'react';

type AssetDetails = {
  assetName?: string;
  assetID?: string;
  assetTypeName?: string;
  location?: string;
};

const AssetInfo: React.FC<{ details: AssetDetails | null; loading: boolean }> = memo(
  ({ details, loading }) => (
    <div className="asset-info-container">
      <div>
        <strong>Asset Name:</strong>{' '}
        {loading ? 'Loading...' : details?.assetName || 'N/A'}
      </div>
      <div>
        <strong>Asset Type:</strong>{' '}
        {loading ? 'Loading...' : details?.assetTypeName || 'N/A'}
      </div>
      <div>
        <strong>Location:</strong> {loading ? 'Loading...' : details?.location || 'N/A'}
      </div>
    </div>
  )
);

export default AssetInfo;