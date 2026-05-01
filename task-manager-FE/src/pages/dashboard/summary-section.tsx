import { Box, Card, Grid, Typography } from "@mui/material";
import styles from "../../styles/styles";

const SummarySection = ({
  summaryData,
  onCardClick,
}: {
  summaryData: SummaryCard[];
  onCardClick: (status: string) => void;
}) => {
  return (
    <>
      <Grid container spacing={2}>
        {summaryData.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                borderRadius: 2,
                cursor: "pointer",
              }}
              onClick={onCardClick ? () => onCardClick(card.title) : undefined}>
              <Box p={2}>
                <Box sx={styles.flexColumnOneGapBox}>
                  <Typography sx={styles.cardHeader}>{card.title}</Typography>
                  <Box sx={styles.flexSpaceBetweenBox}>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight={600}
                        color={card.color}>
                        {card.value}
                      </Typography>
                    </Box>
                    <Box>{card.icon}</Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default SummarySection;
