import { PersonOutline } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material"
import Link from "next/link"
import { useState } from "react"

const Info = ({ data }: any) => {
    const [open, setOpen] = useState(false);

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column', gap: '10px',
        }}>
            <Link
                key={data}
                href={data.path}
                style={{
                    textDecoration: 'none',
                    color: 'gray',
                    fontSize: '12px',
                    transition: '0.3s',
                    paddingBlock: '8px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'black'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'gray'}
            >
                {data.name}
            </Link>
        </Box>

    )
}

export default Info