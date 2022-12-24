import './logo.css';

// TODO: class should be choose value not string
interface Props {
  class?: string;
}

const LogoSVG = (props: Props) => {
  return (
    <div className={'logo-cont' + props.class}>
      <svg
        className="logo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 562.96 337.85"
      >
        <g id="mat-m">
          <path
            d="M259.43,513.83V430.19h30.5l14.76,50.92,14.15-50.92H350v83.64H330.52V455.77h-1.6l-15.5,56.09H295.84l-15.38-56.09h-1.6v58.06Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="mat-a">
          <path
            d="M358,513.83l20.66-83.64h32.48l20.78,83.64H412.32l-4.19-15.37H381.07l-3.93,15.37Zm25.95-30.75h21.77l-8.48-37.39h-4.68Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="mat-t">
          <path
            d="M448.48,513.83v-67.4H427.2V430.19h61.5v16.24H467.91v67.4Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="app-a">
          <path
            d="M259,709.6l43.68-176.8h68.64L415.3,709.6H374l-8.84-32.5h-57.2l-8.32,32.5Zm54.86-65h46l-17.94-79H332.1Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="app-p1">
          <path
            d="M431.94,709.6V532.8H499q23.13,0,38.35,6a43.72,43.72,0,0,1,22.88,19.63q7.66,13.65,7.67,37.57,0,23.4-7.67,37.83a45.32,45.32,0,0,1-22.88,20.93q-15.21,6.5-38.35,6.5H473V709.6ZM473,628h24.7q15.07,0,21.71-7.93t6.63-24q0-16.38-6.5-23.14t-21.84-6.76H473Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="app-p2">
          <path
            d="M588.45,709.6V532.8h67.08q23.15,0,38.35,6a43.68,43.68,0,0,1,22.88,19.63q7.68,13.65,7.67,37.57,0,23.4-7.67,37.83a45.29,45.29,0,0,1-22.88,20.93q-15.21,6.5-38.35,6.5h-26V709.6ZM629.53,628h24.7q15.09,0,21.71-7.93t6.63-24q0-16.38-6.5-23.14t-21.84-6.76h-24.7Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="piti">
          <path
            d="M722.24,709.6V676.93h37.12L782,472.31H577.5l-5.22-22h131V387.78h32.09v62.56H822l-27.07,236a28.85,28.85,0,0,1-8.7,16.33q-7.15,6.95-18,7Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="bur-top">
          <path
            d="M552.8,387.61q-11.81,7.93-18.18,18A50.28,50.28,0,0,0,527,427.33a67.36,67.36,0,0,0,1.75,23.81l137.2-34.45a65.77,65.77,0,0,0-9.76-21.81,51.28,51.28,0,0,0-17.07-15.54q-10.33-5.85-24.48-7.25t-31.74,3Q564.61,379.69,552.8,387.61Zm67.38,4.15q12.47,3.86,19.21,12.62l-93.23,23.31q1.85-10.92,11.16-20.21t29.85-14.43Q607.72,387.92,620.18,391.76Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
        <g id="bur-bot">
          <path
            d="M529.83,496.67a9,9,0,0,1-6.42-4.25,11.44,11.44,0,0,1-1.18-8.28l1.39-7.41,139,26.07-1.39,7.41a11.4,11.4,0,0,1-4.08,7.3,8.78,8.78,0,0,1-7.3,1.67Z"
            transform="translate(-259.04 -371.75)"
          />
        </g>
      </svg>
    </div>
  );
};
export default LogoSVG;