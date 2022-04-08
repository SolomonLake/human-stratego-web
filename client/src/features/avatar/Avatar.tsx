import { FreeCamera, Ray, RayHelper, Vector3 } from "@babylonjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBeforeRender, useEngine, useScene } from "react-babylonjs";
import { useCacheStore } from "../cache/useCache";
import { useSocket } from "../sockets/useSocket";
import { useUserId } from "../user/useUserId";
import { throttle } from "throttle-debounce";
import { CollisionMask } from "../collision/collision";
import { PALATTE } from "../theme/theme";
import { Control } from "@babylonjs/gui";
import { CARDS } from "../cards/cards";
import { TeamCardPanelUI } from "../teams/TeamCardPanelUI";
import { CardUI } from "../cards/CardUI";
import { useTeam } from "../teams/useTeam";

export const AVATAR_HEIGHT = 1;
export const AVATAR_FOREHEAD_HEIGHT = 0.05;
export const AVATAR_WIDTH = AVATAR_HEIGHT * 0.33;
export const AVATAR_DEPTH = AVATAR_HEIGHT * 0.15;

const INITIAL_CAMERA_POSITION = { x: 0, y: 0, z: 0, yRotation: 0 };

export const Avatar = () => {
  const engine = useEngine();
  const scene = useScene();
  const cameraRef = useRef<FreeCamera | null>(null);
  const socket = useSocket();
  const userId = useUserId();

  const throttleEmitPlayerMove = useCallback(
    throttle(500, ({ x, y, z, yRotation }: PlayerPosition) => {
      socket.emit("playerMove", {
        userId: userId,
        position: {
          x,
          y,
          z,
          yRotation,
        },
      });
    }),
    [socket, userId]
  );

  const [initialCachePosition, setInitialCachePosition] = useState<
    PlayerPosition | undefined
  >(undefined);

  const initialPosition = initialCachePosition || INITIAL_CAMERA_POSITION;

  const sendCardChange = (cardId: CardId) => {
    socket.emit("playerCardChange", {
      userId: userId,
      cardId,
    });
  };

  const [cameraPosition, setCameraPosition] = useState(INITIAL_CAMERA_POSITION);

  const [showTeamCardPanel, setShowTeamCardPanel] = useState(false);

  const { cache, dispatch } = useCacheStore();

  const cardId = cache?.players[userId].cardId;
  const teamId = cache?.players[userId].teamId;
  const team = teamId ? cache?.teams[teamId] : undefined;

  useEffect(() => {
    const player = cache?.players[userId];
    if (cache && !player) {
      throw new Error("No current player in cache...");
    }

    if (player && !initialCachePosition) {
      setInitialCachePosition(player.position);
    }
  }, [cache]);

  useEffect(() => {
    const canvas = engine?.getRenderingCanvas();
    if (canvas && engine) {
      canvas.onclick = function () {
        canvas.requestPointerLock =
          canvas.requestPointerLock ||
          canvas.mozRequestPointerLock ||
          canvas.webkitRequestPointerLock;

        canvas.requestPointerLock();
      };
      canvas.tabIndex = engine.canvasTabIndex;
      canvas.focus();
    }
  });

  useBeforeRender(() => {
    const camera = cameraRef.current;
    if (camera) {
      const { x, y: cameraY, z } = camera.position;
      const y = cameraY - AVATAR_HEIGHT + AVATAR_FOREHEAD_HEIGHT;
      const yRotation = camera.rotation.y;
      if (
        cameraPosition.x !== x ||
        cameraPosition.y !== y ||
        cameraPosition.z !== z ||
        cameraPosition.yRotation !== yRotation
      ) {
        const newPosition = { x, y, z, yRotation };
        setCameraPosition(newPosition);
        throttleEmitPlayerMove(newPosition);
      }
    }
  });

  useEffect(() => {
    const canvas = engine?.getRenderingCanvas();
    const onMouseDown = (ev: MouseEvent) => {
      const camera = cameraRef.current;
      if (camera && scene) {
        const target = camera.getTarget().subtract(camera.position);
        const cameraRay = new Ray(camera.position, target);
        const pickInfo = scene.pickWithRay(cameraRay, (mesh) => {
          // return mesh == mazeMesh;
          return true;
        });
        if (pickInfo?.pickedMesh?.name === "card-selector-plane") {
          setShowTeamCardPanel(true);
          document.exitPointerLock();
        }
        console.log(
          "PICK INFO",
          target,
          pickInfo,
          pickInfo?.pickedMesh?.name,
          pickInfo?.getTextureCoordinates()
        );
      }
    };
    if (cameraRef.current && scene && canvas) {
      canvas.addEventListener("mousedown", onMouseDown);
    }

    return () => {
      if (onMouseDown && canvas) {
        canvas.removeEventListener("mousedown", onMouseDown);
      }
    };
  }, [cameraRef, scene]);

  return (
    <>
      <freeCamera
        name="camera1"
        ref={cameraRef}
        keysUp={[87]}
        keysLeft={[65]}
        keysDown={[83]}
        keysRight={[68]}
        checkCollisions
        collisionMask={CollisionMask.Avatar}
        ellipsoidOffset-y={AVATAR_FOREHEAD_HEIGHT}
        position={
          new Vector3(
            initialPosition.x,
            initialPosition.y + AVATAR_HEIGHT,
            initialPosition.z
          )
        }
        rotation={new Vector3(0, initialPosition.yRotation, 0)}
        ellipsoid={
          new Vector3(AVATAR_WIDTH / 2, AVATAR_HEIGHT / 2, AVATAR_DEPTH / 2)
        }
        applyGravity
        speed={0.1}
        minZ={0.01}
      ></freeCamera>

      <adtFullscreenUi name="fullscreen-ui">
        {showTeamCardPanel ? (
          <rectangle
            name="card-selector-background"
            width={0.7}
            height={0.8}
            background={PALATTE.dark}
            thickness={0}
            cornerRadius={20}
          >
            <TeamCardPanelUI
              onSelectCard={(selectedCardId: CardId) => {
                if (
                  selectedCardId !== cardId &&
                  team &&
                  team.cardCounts[selectedCardId] > 0
                ) {
                  dispatch({
                    type: "playerCardChanged",
                    payload: { cardId: selectedCardId, userId },
                  });
                  setShowTeamCardPanel(false);
                  sendCardChange(selectedCardId);
                }
              }}
              onClose={() => {
                setShowTeamCardPanel(false);
              }}
            />
          </rectangle>
        ) : null}
        <>
          {/* 👆✖👁️‍🗨️🦝♠🔘 */}
          <textBlock
            name="crosshair-ui"
            text="✖"
            scaleX={0.4}
            scaleY={0.4}
            color={PALATTE.light}
          />
          {cardId && team && (
            <stackPanel
              verticalAlignment={Control.VERTICAL_ALIGNMENT_TOP}
              horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
              paddingLeft={"10px"}
              paddingRight={"10px"}
              paddingTop={"10px"}
              isVertical
            >
              <rectangle height={"50px"} thickness={0}>
                <textBlock
                  text={CARDS[cardId].displayName}
                  fontSize={40}
                  textHorizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
                  color={PALATTE[team.color]}
                  outlineWidth={13}
                  outlineColor={PALATTE.light}
                />
              </rectangle>
              <CardUI
                cardId={cardId}
                color={PALATTE[team.color]}
                height={"200px"}
                width={"150px"}
                horizontalAlignment={Control.HORIZONTAL_ALIGNMENT_LEFT}
              />
            </stackPanel>
          )}
        </>
      </adtFullscreenUi>
    </>
  );
};
