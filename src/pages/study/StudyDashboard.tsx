import { notify } from "@/common/services/notificationService";
import BreadcrumbView from "@/components/breadcrumb/Breadcrumb";
import TagsView from "@/components/tagView";
import {
    useStudyDetailsByAssetQuery,
    useVRTStudyDetailsByStudyQuery,
} from "@/services/queries/studyQueries";
import { addTag } from "@/store/slices/tagsViewSlice";
import { useEffect, useMemo, useState } from "react";
import { FaFileLines } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import StudyCollapse from "./StudyCollapse";
interface StudyBreadcrumb {
  title: React.ReactNode;
  key: string;
  onClick?: () => void;
  menu?: {
    items: { key: string; label: React.ReactNode; disabled?: boolean }[];
  };
}

const StudyDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { assetId, token } = useParams();
  const [studyRecord, setStudyRecord] = useState<string[]>(
    location?.state?.allStudies || []
  );
  console.log("studyRecord", studyRecord);
  let decodedStudyId: string | undefined = undefined;
  try {
    const decoded = JSON.parse(atob(token || ""));
    decodedStudyId = decoded?.studyId || null;
  } catch {
    decodedStudyId = undefined;
  }

  const {
    data: studies,
    isLoading: studiesLoading,
    isError: studiesError,
    error: studyError,
  } = useStudyDetailsByAssetQuery(assetId);

  const {
    data: studyDetails,
    isLoading: studyLoading,
    isError: isStudyError,
    error: studyErr,
  } = useVRTStudyDetailsByStudyQuery(decodedStudyId, !!decodedStudyId);

  useEffect(() => {
    if (!(studyRecord?.length > 0) && studies?.length) {
      setStudyRecord(studies);
    }
  }, [studyRecord, studies]);

  useEffect(() => {
    if (studiesError) {
      const errorMessage =
        (studyError as any)?.response?.data?.message ||
        (studyError as Error)?.message ||
        "Failed to fetch dashboard data";
      notify("error", "Asset Dashboard Error", errorMessage);
    }
  }, [studiesError, studyError]);

  const menuItems =
    studies && studies.length > 1
      ? studies
          .filter((study: any) => study?.studyId !== decodedStudyId)
          .map((study: any) => ({
            key: study?.studyId,
            label: (
              <Link
                state={{
                  allStudies: studies.filter(
                    (study: any) => study?.studyId !== decodedStudyId
                  ),
                }}
                to={`/studies/vrt/${assetId}/${btoa(
                  JSON.stringify({
                    studyId: study?.studyId,
                    qualStudyType: study?.qualStudyType,
                    qualStudySerialNo: study?.qualStudySerialNo,
                  })
                )}`}
                onClick={() =>
                  dispatch(
                    addTag({
                      path: `/studies/vrt/${assetId}/${btoa(
                        JSON.stringify({
                          studyId: study?.studyId,
                          qualStudyType: study?.qualStudyType,
                          qualStudySerialNo: study?.qualStudySerialNo,
                        })
                      )}`,
                      label: study?.setupName,
                      closable: true,
                      tags: [],
                    })
                  )
                }
              >
                {study?.setupName}
              </Link>
            ),
          }))
      : [{ key: "no-studies", label: "No studies available", disabled: true }];

  const breadcrumbs: StudyBreadcrumb[] = useMemo(() => {
    const assetName = studyDetails?.associatedAsset?.assetName || "";
    const assetID = studyDetails?.associatedAsset?.assetID || assetId;
    return [
      {
        title: (
          <div className="breadcrumb-item">
            <IoHome size={15} className="breadcrumb-icon" />
            <span>Home</span>
          </div>
        ),
        key: "home",
        onClick: () => navigate("/"),
      },
      {
        title: (
          <div className="breadcrumb-item">
            <FaFileLines size={15} className="breadcrumb-icon" />
            <span className="active-breadcrumb">
              {studyLoading ? "Loading..." : assetName || ""}
            </span>
          </div>
        ),
        key: `${assetId}`,
        onClick: () => navigate(`/asset/${assetId}`),
      },
      {
        title: (
          <div className="breadcrumb-item">
            <FaFileLines size={18} className="breadcrumb-icon" />
            <span>
              {studyLoading ? "Loading..." : studyDetails?.setupName || ""}
            </span>
          </div>
        ),
        key: `${assetID}-${studyDetails?.studyID}`,
        menu: { items: menuItems },
        onClick: () => {
          if (!studyDetails?.studyID) return;
          navigate(
            `/studies/vrt/${assetId}/${btoa(
              JSON.stringify({
                studyId: studyDetails.studyID,
                qualStudyType: studyDetails.qualStudyType,
                qualStudySerialNo: studyDetails.qualStudySerialNo,
              })
            )}`
          );
          dispatch(
            addTag({
              path: `/studies/vrt/${assetId}/${btoa(
                JSON.stringify({
                  studyId: studyDetails.studyID,
                  qualStudyType: studyDetails.qualStudyType,
                  qualStudySerialNo: studyDetails.qualStudySerialNo,
                })
              )}`,
              label: studyDetails?.setupName || "Study",
              closable: true,
              tags: [],
            })
          );
        },
      },
    ];
  }, [dispatch, navigate, assetId, menuItems, studyDetails, studyLoading]);
  useEffect(() => {
    if (studyDetails?.studyID) {
      const path = `/studies/vrt/${assetId}/${btoa(
        JSON.stringify({
          studyId: studyDetails.studyID,
          qualStudyType: studyDetails.qualStudyType,
          qualStudySerialNo: studyDetails.qualStudySerialNo,
        })
      )}`;

      dispatch(
        addTag({
          path,
          label: studyDetails?.setupName || "Study",
          closable: true,
          tags: [],
        })
      );
    }
  }, [studyDetails, assetId, dispatch]);
  return (
    <>
      <BreadcrumbView
        breadcrumbs={breadcrumbs}
        title={
          studyLoading
            ? "Loading..."
            : studyDetails?.associatedAsset?.assetName || ""
        }
      />
      <TagsView />
      <StudyCollapse />
    </>
  );
};

export default StudyDashboard;
