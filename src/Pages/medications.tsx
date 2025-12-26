import ReusableHeader from "../modules/Medication/reusable-header";
import MedHistory from "../modules/Medication/med-history";
const Medications = () => {
  return (
    <section className="lg:ml-52 pt-18 lg:pt-14 px-4">
      <ReusableHeader
        heading="Medications"
        text="   Manage your medication schedule"
        buttonText="+ Add Medication"
      />
      <div></div>
      <article className="pt-4 flex justify-between flex-col md:flex-row gap-5">
        {/* items */}
        <MedHistory/>
        <MedHistory/>
        <MedHistory/>
      </article>
    </section>
  );
};

export default Medications;
