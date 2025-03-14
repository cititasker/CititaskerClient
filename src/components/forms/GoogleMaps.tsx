"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { debounce } from "@mui/material/utils";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, FormLabel, SxProps, Theme } from "@mui/material";
import { globalStyles } from "@/globalStyles";

const styles: Record<string, SxProps<Theme>> | any = {
  container: {
    mb: "15px",

    ".required": {
      color: "rgba(217, 63, 33, 1)",
      fontSize: "13.7px",
      fontWeight: "500",
      lineHeight: "20.48px",
      textAlign: "left",
    },
    ...globalStyles.input,
  },
};

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}
const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function GoogleMaps({ name, label }: any) {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && !loaded.current) {
      if (!document.querySelector("#google-maps")) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector("head"),
          "google-maps"
        );
      }

      loaded.current = true;
    }
  }, []);

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            {
              ...request,
              //   types: ["geocode", "establishment"],
              types: ["geocode"],
              componentRestrictions: { country: "NG" },
              strictbounds: true,
            },
            callback
          );
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (typeof window !== "undefined") {
      if (!autocompleteService.current && (window as any).google) {
        autocompleteService.current = new (
          window as any
        ).google.maps.places.AutocompleteService();
      }
      if (!autocompleteService.current) {
        return undefined;
      }

      if (inputValue === "") {
        setOptions(value ? [value] : []);
        return undefined;
      }

      fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      });

      return () => {
        active = false;
      };
    }
  }, [value, inputValue, fetch]);

  const {
    control,
    setValue: setValues,
    formState: { errors },
  } = useFormContext();

  const fetchPlaceDetails = (placeId: string) => {
    const service = new (window as any).google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails(
      { placeId, fields: ["geometry", "address_component"] },
      (place: any, status: any) => {
        if (status === "OK" && place) {
          const locationDetails = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            address_components: place.address_components,
          };
          setValues("location", [
            locationDetails.latitude,
            locationDetails.longitude,
          ]);
          // setValues("latitude", locationDetails.latitude);
        }
      }
    );
  };

  return (
    <FormControl fullWidth sx={styles.container} className="w-full flex-1 mb-5">
      <FormLabel className="mb-2 block label">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.description
            }
            sx={{
              width: "100%",
              flex: 1,
            }}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={(_: any, newValue: any) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setValue(newValue);
              field.onChange(newValue?.description || "");
              if (newValue?.place_id) {
                fetchPlaceDetails(newValue.place_id); // Fetch additional details
              }
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={errors.hasOwnProperty(name)}
                helperText={errors[name]?.message as any}
              />
            )}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;
              const matches =
                option.structured_formatting.main_text_matched_substrings || [];

              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match: any) => [
                  match.offset,
                  match.offset + match.length,
                ])
              );
              return (
                <li key={key} {...optionProps}>
                  <Grid container sx={{ alignItems: "center" }}>
                    <Grid item sx={{ display: "flex", width: 40 }}>
                      <FaMapMarkerAlt
                        size="18px"
                        style={{ color: "text.primary" }}
                      />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: "calc(100% - 44px)",
                        wordWrap: "break-word",
                      }}
                    >
                      {parts.map((part, index) => (
                        <Box
                          key={index}
                          component="span"
                          sx={{
                            fontWeight: part.highlight ? "bold" : "regular",
                          }}
                        >
                          {part.text}
                        </Box>
                      ))}
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }}
          />
        )}
      />
    </FormControl>
  );
}
