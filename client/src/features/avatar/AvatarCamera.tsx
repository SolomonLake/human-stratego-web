import { FreeCamera, Mesh, Quaternion, Tools, Vector3 } from "@babylonjs/core";
import { useEffect, useRef, useState } from "react";
import { useBeforeRender, useEngine } from "react-babylonjs";

function lerp(start: number, end: number, speed: number) {
  return start + (end - start) * speed;
}

function lerp3(p1: Vector3, p2: Vector3, t: number) {
  var x = lerp(p1.x, p2.x, t);
  var y = lerp(p1.y, p2.y, t);
  var z = lerp(p1.z, p2.z, t);

  return new Vector3(x, y, z);
}

const CAMERA_DISTANCE = 1.5;
export const AVATAR_HEIGHT = 0.3;

var mouseY = 0;
var mouseX = 0;
var cameraSpeed = 0.0075;
var mouseSensitivity = 0.0005;
var mouseMin = -35,
  mouseMax = 45;

function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}

export const AvatarCamera = ({
  avatarRef,
}: {
  avatarRef: React.MutableRefObject<Mesh | null>;
}) => {
  const engine = useEngine();

  const [deltaTime, setDeltaTime] = useState(0);

  useEffect(() => {
    if (engine) {
      setDeltaTime(engine.getDeltaTime());
    }
  }, [engine]);

  var mouseMove = function (e: MouseEvent) {
    var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;

    var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    mouseX += movementX * mouseSensitivity * deltaTime;
    mouseY += movementY * mouseSensitivity * deltaTime;
    mouseY = clamp(mouseY, mouseMin, mouseMax);
  };

  document.addEventListener("mousemove", mouseMove);

  function changeCallback(e: Event) {
    const canvas = engine?.getRenderingCanvas();
    if (
      canvas &&
      (document.pointerLockElement === canvas ||
        (document as any).mozPointerLockElement === canvas ||
        (document as any).webkitPointerLockElement === canvas)
    ) {
      // we've got a pointerlock for our element, add a mouselistener
      document.addEventListener("mousemove", mouseMove, false);
    } else {
      // pointer lock is no longer active, remove the callback
      document.removeEventListener("mousemove", mouseMove, false);
    }
  }

  function setupPointerLock() {
    const canvas = engine?.getRenderingCanvas();
    // register the callback when a pointerlock event occurs
    document.addEventListener("pointerlockchange", changeCallback, false);
    document.addEventListener("mozpointerlockchange", changeCallback, false);
    document.addEventListener("webkitpointerlockchange", changeCallback, false);

    // when element is clicked, we're going to request a
    // pointerlock
    if (canvas) {
      canvas.onclick = function () {
        canvas.requestPointerLock =
          canvas.requestPointerLock ||
          canvas.mozRequestPointerLock ||
          canvas.webkitRequestPointerLock;

        // Ask the browser to lock the pointer)
        canvas.requestPointerLock();
      };
    }
  }
  setupPointerLock();

  const cameraRef = useRef<FreeCamera | null>(null);

  useBeforeRender(() => {
    const camera = cameraRef.current;
    const avatar = avatarRef.current;
    if (camera && avatar) {
      camera.position.y = avatar.position.y + AVATAR_HEIGHT;
      camera.position.z =
        avatar.position.z - Math.sin(0 - Math.PI) * -1 * CAMERA_DISTANCE;
      camera.position.x =
        avatar.position.x - Math.cos(0 - Math.PI) * -1 * CAMERA_DISTANCE;
      // const lookAt = new Vector3(
      //   avatar.position.x,
      //   avatar.position.y + AVATAR_HEIGHT,
      //   avatar.position.z
      // );
      // camera.setTarget(lookAt);
      camera.rotation = lerp3(
        camera.rotation,
        new Vector3(Tools.ToRadians(mouseY), Tools.ToRadians(mouseX), 0),
        cameraSpeed * deltaTime
      );
    }
  });

  return (
    <freeCamera name="camera1" ref={cameraRef} position={Vector3.Zero()} />
  );
};
