export const Button = ({ type, onclick }: { type: any, onclick: any }) => {
    return (
        <>
            <button
                type={type}
                onClick={onclick}
                style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                }}
            >
                ✕
            </button>
        </>
    )
}