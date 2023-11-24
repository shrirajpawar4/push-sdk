import React from 'react';

export const TokenGatedSvg = ({ color }: { color?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.75 0.25C7.82164 0.25 5.93657 0.821828 4.33319 1.89317C2.72982 2.96452 1.48013 4.48726 0.742179 6.26884C0.00422448 8.05042 -0.188858 10.0108 0.187348 11.9021C0.563554 13.7934 1.49215 15.5307 2.85571 16.8943C4.21927 18.2579 5.95656 19.1865 7.84787 19.5627C9.73919 19.9389 11.6996 19.7458 13.4812 19.0078C15.2627 18.2699 16.7855 17.0202 17.8568 15.4168C18.9282 13.8134 19.5 11.9284 19.5 10C19.4973 7.41498 18.4692 4.93661 16.6413 3.10872C14.8134 1.28084 12.335 0.25273 9.75 0.25ZM15.7613 12.7319C15.9318 12.8343 16.0547 13.0003 16.1029 13.1934C16.1511 13.3864 16.1206 13.5907 16.0181 13.7612C15.9157 13.9318 15.7497 14.0547 15.5566 14.1029C15.3636 14.1511 15.1593 14.1206 14.9888 14.0181L10.5 11.3247V16.1875C10.5 16.3864 10.421 16.5772 10.2803 16.7178C10.1397 16.8585 9.94892 16.9375 9.75 16.9375C9.55109 16.9375 9.36033 16.8585 9.21967 16.7178C9.07902 16.5772 9 16.3864 9 16.1875V11.3247L4.51125 14.0181C4.34069 14.1206 4.13641 14.1511 3.94337 14.1029C3.75032 14.0547 3.58432 13.9318 3.48188 13.7612C3.37944 13.5907 3.34895 13.3864 3.39713 13.1934C3.4453 13.0003 3.56819 12.8343 3.73875 12.7319L8.29219 10L3.73875 7.26813C3.56819 7.16569 3.4453 6.99968 3.39713 6.80664C3.34895 6.61359 3.37944 6.40932 3.48188 6.23875C3.58432 6.06818 3.75032 5.9453 3.94337 5.89712C4.13641 5.84895 4.34069 5.87944 4.51125 5.98187L9 8.67531V3.8125C9 3.61359 9.07902 3.42282 9.21967 3.28217C9.36033 3.14152 9.55109 3.0625 9.75 3.0625C9.94892 3.0625 10.1397 3.14152 10.2803 3.28217C10.421 3.42282 10.5 3.61359 10.5 3.8125V8.67531L14.9888 5.98187C15.0732 5.93115 15.1668 5.89756 15.2643 5.88302C15.3617 5.86848 15.4611 5.87327 15.5566 5.89712C15.6522 5.92098 15.7422 5.96342 15.8214 6.02204C15.9005 6.08065 15.9674 6.15429 16.0181 6.23875C16.0689 6.32321 16.1024 6.41683 16.117 6.51427C16.1315 6.6117 16.1267 6.71105 16.1029 6.80664C16.079 6.90222 16.0366 6.99218 15.978 7.07136C15.9193 7.15054 15.8457 7.2174 15.7613 7.26813L11.2078 10L15.7613 12.7319Z"
        fill={color??"#657795"}
      />
    </svg>
  );
};