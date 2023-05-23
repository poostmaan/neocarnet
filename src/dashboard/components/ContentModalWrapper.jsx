import styled from "styled-components";
import { device } from "../../theme/device.js";

export const ContentModalWrapper = styled.div`
  @media ${device.tablet}{
    .modalContainer{
			width: 50% !important;
		}
  }
`;