import { useSelector } from "react-redux";

export default function CanvasSettings() {
  const illo = useSelector(state => state.illo);

  return (
    <div>
      <div>
        <div>
          <span>Rotation</span>
          <button>reset</button>
        </div>

        <div>
          <div>
            <span>Rotate X</span>
            <span>{illo.rotate.x}</span>
          </div>
          <div>
            <span>Rotate Y</span>
            <span>{illo.rotate.y}</span>
          </div>
          <div>
            <span>Rotate Z</span>
            <span>{illo.rotate.z}</span>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Settings</span>
        </div>
        <div>
          <div>
            <span>Drag to rotate</span>
            <input type="checkbox" checked={illo.dragRotate} />
          </div>
          <div>
            <span>Centered</span>
            <span>
              <input type="checkbox" checked={illo.centered} />
            </span>
          </div>
        </div>
      </div>

      <div>
        <div>
          <span>Illustration</span>
        </div>
        <div>
          <div>
            <span>Background</span>
            <span>{illo.rotate.x}</span>
          </div>
          <div>
            <span>Zoom</span>
            <span>{illo.zoom}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
