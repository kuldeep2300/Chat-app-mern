export const GenderCheckBox = ({ onCheckBoxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label htmlFor="checkbox" className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" :  ""}`}> {/* Here we are telling that if male checkbox is selected then it will be stored in side the inputs.gender field and then again the Gender.jsx component re-render then it will check selectedGender === male then we apply selected class meaning only this is selected, and if selectedGender is not equal to male then it will not be selected empty. */}
          <span className="label-text text-black font-semibold">Male</span>
          <input
            type="checkbox"
            id="checkbox"
            className="checkbox border-slate-900 checkbox-success"
            checked={selectedGender === "male"}
            onChange={() => onCheckBoxChange("male")}
          />
        </label>
      </div>

      <div className="form-control">
        <label htmlFor="checkbox2" className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
          <span className="label-text text-black font-semibold">Female</span>
          <input
            type="checkbox"
            id="checkbox2"
            className="checkbox checkbox-success border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckBoxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};
