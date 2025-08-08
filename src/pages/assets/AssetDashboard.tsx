import { notify } from "@/common/services/notificationService";
import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import { useAssetDetailsByIdQuery } from "@/services/queries/assetQueries";
import { useEffect } from "react";
import { FaFileLines } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

const AssetDashboard = () => {
  const navigate = useNavigate();
  const { assetId } = useParams();
  const {
    data: assetDetails,
    isLoading: assetLoading,
    isError: assetError,
    error,
  } = useAssetDetailsByIdQuery(assetId);

  useEffect(() => {
    if (assetError) {
      const errorMessage =
        (error as Error)?.message ||
        (error as any)?.response?.data?.message ||
        "Failed to fetch dashboard data";
      notify("error", "Asset Details Error", errorMessage);
    }
  }, [assetError, error]);
  return (
    <>
      <BreadcrumbView
      breadcrumbs={[
            {
              title: (
                <div className="breadcrumb-item">
                  <IoHome size={15} className="breadcrumb-icon" />
                  <span>Home</span>
                </div>
              ),
              key: 'home',
              onClick: () => navigate('/'),
            },
            {
              title: (
                <div className="breadcrumb-item">
                  <FaFileLines size={15} className="breadcrumb-icon" />
                  <span>{assetLoading ? 'Loading...' : assetDetails?.assetName || ''}</span>
                </div>
              ),
              key: `${assetId}`,
              onClick: () => navigate(`/asset/${assetId}`),
            },
          ]}
        title = {assetLoading ? 'Loading...' : assetDetails?.assetName || ''}
      />
      <h1>Dashboard</h1>
    </>
  );
};

export default AssetDashboard;
